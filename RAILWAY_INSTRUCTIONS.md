# ==============================
# ДЕПЛОЙ НА RAILWAY — ПОЛНАЯ ИНСТРУКЦИЯ
# ==============================

## ВАЖНО: Только 1 обязательная переменная!

| Переменная | Обязательна | Описание |
|---|---|---|
| `DATABASE_URL` | ✅ ДА | URL базы данных MySQL |
| `APP_ID` | ❌ Нет | Только для OAuth-входа |
| `APP_SECRET` | ❌ Нет | Только для OAuth-входа |
| `OWNER_UNION_ID` | ❌ Нет | Только для первичного админа |

**Без OAuth переменных сайт работает на 100%!** Просто админку можно войти через демо-режим (пароль: `rod-admin`).

---

## Шаг 0: Подготовка (5 минут)

### Что нужно:
1. Аккаунт GitHub → https://github.com
2. Аккаунт Railway → https://railway.app (вход через GitHub)
3. Git установлен → https://git-scm.com/downloads

---

## Шаг 1: Загрузка кода на GitHub (5 минут)

### 1.1 Создайте репозиторий:
1. Откройте https://github.com/new
2. Имя: `rod-pao`
3. **Public** (бесплатно)
4. НЕ ставьте галочки (README, .gitignore, license)
5. Нажмите **Create repository**

### 1.2 Загрузите код (в терминале):
```bash
cd /mnt/agents/output/app   # или где ваш проект

git init
git add .
git commit -m "Initial commit"

git remote add origin https://github.com/ВАШ_НИК/rod-pao.git
git push -u origin main
```

> Если пишет `error: failed to push` — выполните:
> ```bash
> git pull origin main --rebase
> git push origin main
> ```

---

## Шаг 2: Создание базы данных MySQL (3 минуты)

1. Откройте https://railway.app/dashboard
2. Нажмите **New Project**
3. Выберите **Provision MySQL**
4. Подождите 1 минуту (иконка станет зелёной)

### Получите DATABASE_URL:
1. Кликните на иконку MySQL
2. Перейдите во вкладку **Connect**
3. Скопируйте **Database URL** — выглядит так:
   ```
   mysql://root:AbCdEfGh123@containers-us-west-123.railway.app:1234/railway
   ```

> 💾 **Сохраните это значение!** Оно понадобится на следующем шаге.

---

## Шаг 3: Деплой приложения (5 минут)

### 3.1 Создайте сервис:
1. В том же проекте нажмите **New**
2. Выберите **GitHub Repo**
3. Найдите и выберите `rod-pao`
4. Railway начнёт сборку автоматически

### 3.2 Добавьте переменные окружения:
1. Кликните на сервис `rod-pao`
2. Перейдите во вкладку **Variables**
3. Нажмите **New Variable**
4. Добавьте:

| Имя | Значение |
|---|---|
| `DATABASE_URL` | `mysql://root:...` (вставьте из Шага 2) |

> ⚠️ **Всё! Больше ничего не нужно.**

4. Нажмите **Deploy** (если не задеплоилось автоматически)

### 3.3 Дождитесь сборки:
- Зайдите во вкладку **Deployments**
- Ждите пока статус станет **Healthy** (зелёная галочка)
- Это занимает 3-5 минут

---

## Шаг 4: Инициализация базы данных (3 минуты)

### 4.1 Примените схему:
1. В Railway откройте сервис `rod-pao`
2. Перейдите во вкладку **Deployments**
3. Нажмите на активный деплой (зелёный)
4. Перейдите во вкладку **Shell** (иконка `>_`)
5. Выполните:
   ```bash
   npx drizzle-kit push
   ```
   Нажмите `y` если спросит подтверждение.

### 4.2 Заполните данные:
В том же Shell выполните:
```bash
npx tsx db/seed.ts
```

Вы увидите:
```
Seeding database...
Demo admin user created (unionId: demo-admin)
Categories seeded.
Services seeded.
Settings seeded.
Contents seeded.
Done.
```

✅ **База данных готова!**

---

## Шаг 5: Проверка работы (2 минуты)

### 5.1 Получите URL:
1. Откройте сервис `rod-pao`
2. Перейдите во вкладку **Settings**
3. В разделе **Domains** скопируйте URL
   - Выглядит как: `https://rod-pao-production.up.railway.app`

### 5.2 Проверьте в браузере:

| URL | Что должно быть |
|---|---|
| `https://ВАШ-ДОМЕН.up.railway.app` | Главная страница |
| `https://ВАШ-ДОМЕН.up.railway.app/api/health` | `{"status":"ok"}` |
| `https://ВАШ-ДОМЕН.up.railway.app/login` | Страница входа |

### 5.3 Вход в админ-панель:
1. Откройте `/login`
2. Введите пароль: **`rod-admin`**
3. Нажмите **Войти как администратор**
4. Вас перекинет на `/admin`

---

## Шаг 6: Настройка домена (опционально)

### Бесплатный Railway-домен:
Уже работает! URL из Шага 5.1.

### Свой домен (например rod-pao.ru):
1. Railway → Сервис → Settings → Domains
2. Нажмите **+ Custom Domain**
3. Введите ваш домен
4. Railway покажет DNS-записи — добавьте их в ваш регистратор
5. Подождите 5-30 минут (DNS-распространение)

---

## Опционально: OAuth-авторизация (если нужна)

Если хотите вход через Kimi OAuth (вместо пароля):

1. Получите `APP_ID` и `APP_SECRET` в портале Kimi
2. В Railway добавьте переменные:
   - `APP_ID`
   - `APP_SECRET`
   - `OWNER_UNION_ID`
   - `VITE_APP_ID` (то же значение что и APP_ID)
   - `VITE_KIMI_AUTH_URL`
3. Обновите callback URL в портале Kimi на:
   ```
   https://ВАШ-ДОМЕН.up.railway.app/api/oauth/callback
   ```

---

## Диагностика проблем

### ❌ "Build failed"
**Решение:**
1. Railway → Deployments → кликните на красный деплой
2. Посмотрите логи — найдите красную строку с ошибкой
3. Частые причины:
   - Нет `DATABASE_URL` → добавьте переменную
   - Ошибка в TypeScript → проверьте `npm run check` локально

### ❌ "Cannot connect to database"
**Решение:**
1. Проверьте `DATABASE_URL` — правильный ли он?
2. Убедитесь что MySQL запущен (зелёная иконка)
3. В Shell проверьте:
   ```bash
   echo $DATABASE_URL
   ```

### ❌ "404 Not Found" на API
**Решение:**
1. Проверьте логи в Deployments → Logs
2. Возможно backend не скомпилировался
3. Выполните в Shell:
   ```bash
   ls dist/
   ```
   Должно быть: `boot.js`, `public/`

### ❌ Сайт открылся, но данные не загружаются
**Решение:**
1. Проверьте что `db:push` выполнен (Шаг 4.1)
2. Проверьте что `seed` выполнен (Шаг 4.2)
3. Откройте консоль браузера (F12) → посмотрите ошибки запросов

---

## Обновление сайта (после изменений)

```bash
# Внесите изменения в код
git add .
git commit -m "Описание изменений"
git push origin main
```

Railway автоматически пересоберёт и задеплоит (3-5 минут).

---

## Быстрые команды

```bash
# Локальный запуск
cd /mnt/agents/output/app
npm run dev

# Сборка для production
npm run build

# Push схемы БД
npx drizzle-kit push

# Seed данных
npx tsx db/seed.ts
```

---

## Лимиты Railway (бесплатный план)

| Ресурс | Лимит |
|---|---|
| Время работы | 500 часов/мес |
| Диск | 5 GB |
| Сетевой трафик | 100 GB/мес |
| MySQL | 500 MB |

> Для production рекомендуется платный план ($5/мес) — убирает лимиты.

---

## Контакты и помощь

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Drizzle ORM: https://orm.drizzle.team
- Hono Framework: https://hono.dev
