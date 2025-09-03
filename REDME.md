## Setup & Start Development

1. **Install dependencies**  
   ```bash
   cd /opt/hello-japan/React
   npm install
   cd /opt/hello-japan/Node
   npm install
   ```

2. **Start React dev server**  
   ```bash
   cd /opt/hello-japan/React
   npm run dev
   ```

3. **Start Node.js server**  
   ```bash
   cd /opt/hello-japan/Node
   node server.js
   ```

---

## Deploy as a Service (Linux)

Simply copy the prepared service files (`chroma.furniture.service`, `node.furniture.service`) to `/etc/systemd/system/` and edit the path, user, or content if needed.

```bash
sudo cp chroma.furniture.service /etc/systemd/system/
sudo cp node.furniture.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable chroma.furniture.service
sudo systemctl enable node.furniture.service
sudo systemctl start chroma.furniture.service
sudo systemctl start node.furniture.service
sudo systemctl status chroma.furniture.service
sudo systemctl status node.furniture.service
```

## Nginx Configuration

1. **Sample nginx config (`minhphuc.store.conf`)**:
   ```nginx
   server {
       listen 80;
       server_name minhphuc.store www.minhphuc.store;

       root /opt/hello-japan/React/dist;
       index index.html;

       # API forward to Node.js
       location /api {
           proxy_pass http://127.0.0.1:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           client_max_body_size 50M;
       }

       # React static files
       location / {
           try_files $uri /index.html;
       }

       # Increase max body size for all requests
       client_max_body_size 50M;

       error_log /var/log/nginx/minhphuc.store.error.log;
       access_log /var/log/nginx/minhphuc.store.access.log;
   }
   ```

2. **Enable nginx config**:
   ```bash
   sudo cp minhphuc.store.conf /etc/nginx/sites-available/
   sudo ln -s /etc/nginx/sites-available/minhphuc.store.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```