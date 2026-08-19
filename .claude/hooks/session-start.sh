#!/bin/bash
set -uo pipefail

# Provisions PAI Pro (Utopai's PAI engine — see PROJECT_HANDOFF.md §4) on
# every new Claude Code on the web session for this repo, so it doesn't
# need to be re-cloned/reconnected by hand each time. Idempotent — every
# step skips cleanly if already done on this container.

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PAI_DIR="/home/user/pai-pro"
PROJECT_ID="wildwest"

if [ -d "$PAI_DIR/.git" ]; then
  echo "[pai-pro] already cloned at $PAI_DIR"
else
  echo "[pai-pro] cloning Utopai-Research/pai-pro..."
  if git clone --quiet https://github.com/Utopai-Research/pai-pro.git "$PAI_DIR"; then
    echo "[pai-pro] clone OK"
  else
    echo "[pai-pro] WARNING: clone failed — PAI Pro will not be available this session"
    exit 0
  fi
fi

if [ -f "$PAI_DIR/.env" ]; then
  echo "[pai-pro] .env already present"
elif [ -n "${PAI_KEY:-}" ]; then
  if [ -f "$PAI_DIR/.env.example" ] && cp "$PAI_DIR/.env.example" "$PAI_DIR/.env"; then
    sed "s|^PAI_KEY=.*|PAI_KEY=${PAI_KEY}|" "$PAI_DIR/.env" > "$PAI_DIR/.env.tmp" \
      && mv "$PAI_DIR/.env.tmp" "$PAI_DIR/.env" \
      || rm -f "$PAI_DIR/.env.tmp"
    echo "[pai-pro] .env written from \$PAI_KEY"
  else
    echo "[pai-pro] WARNING: .env.example missing — could not write .env"
  fi
else
  echo "[pai-pro] WARNING: \$PAI_KEY is not set at the environment level — PAI Pro calls will fail this session."
  echo "[pai-pro]          Set PAI_KEY as an environment variable on this Claude Code environment (claude.ai/code environment settings) to fix this permanently."
fi

mkdir -p "$PAI_DIR/projects/$PROJECT_ID/assets"

if [ -f "$PAI_DIR/.active_project" ]; then
  echo "[pai-pro] .active_project already set to $(cat "$PAI_DIR/.active_project")"
else
  printf '%s' "$PROJECT_ID" > "$PAI_DIR/.active_project"
  echo "[pai-pro] .active_project set to $PROJECT_ID"
fi

if [ -d "$PAI_DIR/server/node_modules" ]; then
  echo "[pai-pro] server deps already installed"
else
  echo "[pai-pro] installing server deps..."
  if npm --prefix "$PAI_DIR/server" install --silent; then
    echo "[pai-pro] npm install OK"
  else
    echo "[pai-pro] WARNING: npm install failed — check $PAI_DIR/server manually"
  fi
fi

exit 0
