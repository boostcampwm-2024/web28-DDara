# 1. 베이스 이미지 설정 (Node.js 18 사용)
FROM node:18 AS builder

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. root의 패키지 파일 복사
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 4. pnpm 설치
RUN npm install -g pnpm

# 5. 전체 의존성 설치 (root)
RUN pnpm install

# 6. 프론트엔드 폴더 복사
COPY frontend /app/frontend

# 7. 작업 디렉토리 변경
WORKDIR /app/frontend

# 8. frontend 의존성 설치
RUN pnpm install

# 8. 빌드 실행
RUN pnpm build

# 9. Nginx 이미지를 사용해 정적 파일 제공
FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
