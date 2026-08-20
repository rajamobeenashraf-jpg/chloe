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
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PATCH_DIR="$SCRIPT_DIR/../../patches"

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

# Apply local fixes for bugs in the upstream client that haven't been
# upstreamed yet (a fresh clone otherwise has none of these fixes).
if [ -d "$PATCH_DIR" ]; then
  for patch in "$PATCH_DIR"/*.patch; do
    [ -f "$patch" ] || continue
    name="$(basename "$patch")"
    if (cd "$PAI_DIR" && git apply --check --reverse "$patch") 2>/dev/null; then
      echo "[pai-pro] patch already applied: $name"
    elif (cd "$PAI_DIR" && git apply "$patch") 2>/dev/null; then
      echo "[pai-pro] applied patch: $name"
    else
      echo "[pai-pro] WARNING: patch did not apply cleanly, check manually: $name"
    fi
  done
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

# Restore per-project tooling that lives under pai-pro/projects/ (outside
# pai-pro's own git history, so a fresh clone never has it). This is exactly
# what happened to Ep 1's qc_pass.mjs/build_final_cut.mjs — lost with the
# old container, had to be rebuilt from scratch for Ep 2. Only copies files
# that don't already exist, so it never clobbers in-session edits.
TOOLING_DIR="$SCRIPT_DIR/../../pai-pro-tooling"
if [ -d "$TOOLING_DIR" ]; then
  for project_dir in "$TOOLING_DIR"/*/; do
    [ -d "$project_dir" ] || continue
    project="$(basename "$project_dir")"
    dest="$PAI_DIR/projects/$project"
    mkdir -p "$dest"
    for f in "$project_dir"*; do
      [ -f "$f" ] || continue
      name="$(basename "$f")"
      if [ -f "$dest/$name" ]; then
        echo "[pai-pro] $project/$name already present"
      else
        cp "$f" "$dest/$name"
        echo "[pai-pro] restored $project/$name"
      fi
    done
  done
fi

exit 0
