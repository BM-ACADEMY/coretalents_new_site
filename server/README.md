# CoreTalents — API server

Express + MongoDB. Admin login and the popups shown on the site.

## Run

```bash
npm install
cp .env.example .env   # then fill it in
npm run dev            # http://localhost:5000, restarts on file changes
npm start              # production
```

MongoDB must be running (`MONGO_URI`).

## .env

| Var | Meaning |
|---|---|
| `PORT` | Port the API listens on |
| `MONGO_URI` | MongoDB connection string |
| `CLIENT_ORIGIN` | Site URLs allowed to call the API, comma separated (`http://localhost:5173,https://coretalents.in`) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | The admin login. Synced to the database on every start: edit, restart, done |
| `JWT_SECRET` | 32+ random characters; signs admin sessions. Changing it signs everyone out |
| `JWT_EXPIRES` | How long a login lasts (`7d`) |
| `UPLOAD_DIR` | Folder for popup images (`uploads`) |
| `MAX_UPLOAD_MB` | Largest image accepted |

`.env` is git-ignored. The client needs `VITE_API_URL` pointing at this server.

## Admin panel

`<site>/admin/login` -> Popups. Two types:

- **Image** - one image at a custom size / ratio; clicking it opens a link.
- **Content** - heading, text and one button with a link.

Create as many as needed; only the ones switched on are sent to the site. Each popup shows
either on exit intent (desktop) or after a delay (all devices), once per visitor.

## Images

Stored on this server's disk in `UPLOAD_DIR` and served from `/uploads/...`. Replacing a
popup's image deletes the old file; deleting a popup deletes its file. The host therefore
needs a disk that survives restarts and deploys.

## API

| | |
|---|---|
| `GET /api/popups/active` | public - popups that are switched on |
| `POST /api/admin/login` | `{ email, password }` -> `{ token }` |
| `GET /api/admin/me` | current admin |
| `GET/POST /api/admin/popups` | list / create (multipart, file field `image`) |
| `GET/PUT/DELETE /api/admin/popups/:id` | read / update / delete |
| `PATCH /api/admin/popups/:id/active` | `{ active: true \| false }` |

Admin routes need `Authorization: Bearer <token>`.
