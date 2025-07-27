#!/usr/bin/env sh

# 當發生錯誤時終止腳本
set -e

# 建置 React 專案（build 輸出到 build/ 資料夾）
npm run build

# 進入建置輸出資料夾
cd build

# 避免 GitHub Pages 使用 Jekyll 處理
touch .nojekyll

# 自訂網域（如果有使用，否則可刪除這行）
# echo 'your.custom.domain' > CNAME

# 設定 GitHub Pages 的來源 repo
if [ -z "$GITHUB_TOKEN" ]; then
  msg='manual deploy'
  githubUrl=git@github.com:jiayenli/web-frontend-exam.git
else
  msg='github action deploy'
  githubUrl=https://git:${GITHUB_TOKEN}@github.com/jiayenli/web-frontend-exam.git

  # 設定 git 身份
  git config --global user.name "${USER_NAME:-github-actions[bot]}"
  git config --global user.email "${USER_EMAIL:-github-actions[bot]@users.noreply.github.com}"
fi

# 初始化 git 並提交 build 結果
git init
git checkout -b main
git add -A
git commit -m "$msg"

# 強制推送到 gh-pages 分支
git push -f "$githubUrl" main:gh-pages

# 返回原來目錄
cd -
