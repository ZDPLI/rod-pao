# ==============================
# ДЕПЛОЙ НА RAILWAY — ПОЛНАЯ ИНСТРУКЦИЯ
# ==============================

## Шаг 0: Подготовка (перед началом)

### Что вам понадобится:
1. Аккаунт на GitHub (https://github.com)
2. Аккаунт на Railway (https://railway.app) — можно залогиниться через GitHub
3. Git установлен на компьютере

### Установка Git (если не установлен):
```bash
# Ubuntu/Debian
sudo apt-get install git

# macOS
brew install git

# Windows — скачайте с https://git-scm.com/download/win
```

---

## Шаг 1: Загрузка проекта на GitHub

### 1.1 Создайте репозиторий на GitHub:
1. Откройте https://github.com/new
2. Введите имя: `rod-pao`
3. Выберите "Public" (или Private)
4. НЕ ставьте галочки (README, .gitignore, license)
5. Нажмите "Create repository"

### 1.2 Загрузите код:
```bash
# Откройте терминал и перейдите в папку проекта
cd /mnt/agents/output/app

# Инициализируйте Git
git init

# Добавьте все файлы
git add .

# Сделайте первый коммит
git commit -m "Initial commit for Railway deployment"

# Привяжите к GitHub (замените ВАШ_НИК на ваш username)
git remote add origin https://github.com/ВАШ_НИК/rod-pao.git

# Загрузите на GitHub
git push -u origin main
```

> Если ветка называется `master` вместо `main`:
> ```bash
> git branch -M main
> ```

---

## Шаг 2: Создание базы данных MySQL на Railway

### 2.1 Зайдите на Railway:
1. Откройте https://railway.app
2. Нажмите "Login" → "Continue with GitHub"

### 2.2 Создайте проект:
1. Нажмите "New Project"
2. Выберите "Provision MySQL"
3. Подождите 1-2 минуты пока MySQL запустится

### 2.3 Получите DATABASE_URL:
1. В проекте кликните на иконку MySQL
2. Перейдите во вкладку "Connect"
3. Скопируйте значение поля "Database URL" — оно выглядит так:
   ```
   mysql://root:PASSWORD@HOSTNAME.railway.app:PORT/railway
   ```
4. Сохраните это значение — оно понадобится на Шаге 3

---

## Шаг 3: Деплой приложения на Railway

### 3.1 Создайте сервис из GitHub:
1. В том же проекте нажмите "New" → "GitHub Repo"
2. Выберите репозиторий `rod-pao`
3. Railway начнёт автоматическую сборку (ждите 3-5 минут)

### 3.2 Настройте переменные окружения:
1. Кликните на ваш сервис (rod-pao)
2. Перейдите во вкладку "Variables" → "Add Variables"
3. Добавьте следующие переменные:

| Переменная | Значение | Где взять |
|---|---|---|
| `DATABASE_URL` | `mysql://root:...` | Скопируйте из MySQL (Шаг 2.3) |
| `APP_ID` | `your-app-id` | Из .env файла проекта |
| `APP_SECRET` | `your-app-secret` | Из .env файла проекта |
| `OWNER_UNION_ID` | `your-union-id` | Из .env файла проекта |

### 3.3 Пересоберите:
После добавления переменных Railway автоматически пересоберёт проект. Если не пересобрал — нажмите "Deploy" вручную.

---

## Шаг 4: Инициализация базы данных

### 4.1 Примените схему (db:push):
1. В Railway откройте ваш сервис
2. Перейдите во вкладку "Deployments"
3. Нажмите на активный деплой
4. Перейдите во вкладку "Logs"
5. Нажмите "Shell" (иконка терминала)
6. Выполните:
   ```bash
   npx drizzle-kit push
   ```

### 4.2 Заполните данные (seed):
В том же Shell выполните:
```bash
npx tsx db/seed.ts
```

Вы должны увидеть:
```
Seeding database...
Categories seeded.
Services seeded.
Settings seeded.
Contents seeded.
Done.
```

---

## Шаг 5: Получение домена и проверка

### 5.1 Домен:
1. В Railway откройте ваш сервис
2. Перейдите во вкладку "Settings"
3. В разделе "Environment" → "Domains" скопируйте URL
   - Он будет выглядеть как: `https://rod-pao-production.up.railway.app`

### 5.2 Проверка работы:
Откройте в браузере:
- `https://ВАШ-ДОМЕН.up.railway.app` — должен открыться сайт
- `https://ВАШ-ДОМЕН.up.railway.app/api/health` — должен вернуть `{"status":"ok"}`

---

## Шаг 6: Обновление OAuth callback (если используется авторизация)

Если у вас настроена Kimi OAuth авторизация, обновите callback URL:
1. В портале Kimi найдите настройки вашего приложения
2. Callback URL должен быть:
   ```
   https://ВАШ-ДОМЕН.up.railway.app/api/oauth/callback
   ```

---

## Диагностика проблем

### Проблема: "Build failed"
**Решение:**
1. Перейдите в "Deployments" → кликните на последний деплой
2. Посмотрите логи сборки — найдите ошибку
3. Частые причины:
   - Отсутствует `DATABASE_URL` — добавьте переменную
   - Ошибка TypeScript — исправьте типы и пересоберите

### Проблема: "Cannot connect to database"
**Решение:**
1. Проверьте что `DATABASE_URL` правильный
2. Убедитесь что MySQL запущен (зелёная иконка)
3. В Shell попробуйте:
   ```bash
   node -e "console.log(process.env.DATABASE_URL)"
   ```

### Проблема: "404 Not Found" на API
**Решение:**
1. Проверьте логи в "Deployments" → "Logs"
2. Убедитесь что backend скомпилировался:
   ```bash
   ls dist/
   # Должно быть: boot.js, public/
   ```

### Проблема: Сайт открывается но API не работает
**Решение:**
1. Проверьте CORS в `api/boot.ts`
2. Убедитесь что `VITE_TRPC_URL` не установлен (используется относительный путь)
3. Проверьте в консоли браузера (F12) ошибки запросов

---

## Управление (после деплоя)

### Обновление сайта:
```bash
# Внесите изменения
git add .
git commit -m "Update: описание изменений"
git push origin main
```
Railway автоматически пересоберёт и задеплоит.

### Просмотр логов:
1. Railway → Ваш сервис → Deployments → Logs

### Перезапуск:
1. Railway → Ваш сервис → Deployments → Нажмите "Restart"

### Добавление пользователя-админа:
1. Войдите на сайт через OAuth
2. В Railway откройте Shell MySQL:
   ```bash
   mysql -u root -p$MYSQL_ROOT_PASSWORD railway
   ```
3. Выполните:
   ```sql
   UPDATE users SET role = 'admin' WHERE id = 1;
   ```

---

## Структура проекта на Railway

```
Railway Project
├── MySQL (база данных)
│   └── railway
│       ├── categories (категории услуг)
│       ├── services (услуги)
│       ├── contents (контент)
│       ├── settings (настройки)
│       └── users (пользователи)
│
└── rod-pao (ваше приложение)
    ├── Frontend (React + Vite)
    │   └── http://ВАШ-ДОМЕН.up.railway.app/
    ├── Backend (Hono + tRPC)
    │   └── http://ВАШ-ДОМЕН.up.railway.app/api/
    └── Database (Drizzle ORM)
        └── mysql://... (через внутреннюю сеть Railway)
```

---

## Бесплатные лимиты Railway

| Ресурс | Лимит |
|---|---|
| Время работы | 500 часов/мес |
| Диск | 5 GB |
| Сетевой трафик | 100 GB/мес |
| MySQL | 500 MB |

> Для продакшена рекомендуется перейти на платный план ($5/мес).

---

## Быстрые команды (шпаргалка)

```bash
# Локальный запуск с Docker
docker-compose up --build

# Только база данных
docker-compose up mysql

# Проверка health endpoint
curl http://localhost:3000/api/health

# Push схемы БД
npx drizzle-kit push

# Seed данных
npx tsx db/seed.ts
```

---

## Контакты поддержки

Если возникли проблемы:
1. Railway Docs: https://docs.railway.app
2. Railway Discord: https://discord.gg/railway
3. Drizzle Docs: https://orm.drizzle.team
4. Hono Docs: https://hono.dev
