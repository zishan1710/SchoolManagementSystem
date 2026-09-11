# Deployment Guide

This guide provides step-by-step instructions to deploy the School Management Application on Netlify (Frontend) and Render (Backend).

## Prerequisites

- GitHub account with the repository
- Netlify account (https://netlify.com)
- Render account (https://render.com)
- PostgreSQL database (Render PostgreSQL or external provider)

---

## Part 1: Backend Deployment on Render

### Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub
2. Update `backend/.gitignore` to exclude sensitive files
3. Ensure `pom.xml` has the correct Spring Boot version

### Step 2: Create PostgreSQL Database on Render

1. Log in to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Fill in the form:
   - **Name**: `school_management_db`
   - **Database**: `school_management`
   - **Username**: `postgres` (or your preferred username)
   - **Region**: Choose closest to your location
4. Create database
5. Note the connection details:
   - Internal Database URL
   - Username
   - Password
   - Host
   - Port

### Step 3: Create Web Service on Render

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Fill in the form:
   - **Name**: `school-management-backend`
   - **Environment**: `Docker`
   - **Region**: Same as database
   - **Branch**: `main`

4. **Build Command**:
   ```bash
   mvn clean package -DskipTests
   ```

5. **Start Command**:
   ```bash
   java -jar target/school-management-backend-1.0.0.jar
   ```

### Step 4: Set Environment Variables

In Render dashboard, go to your web service and add these environment variables:

```
DATABASE_URL=postgresql://username:password@host:port/database
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
JWT_SECRET=your-very-secure-random-jwt-secret-key-minimum-64-characters-long
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
```

### Step 5: Deploy

1. Render will automatically deploy when you push to GitHub
2. Monitor the deployment in the "Logs" tab
3. Once deployed, note your backend URL (e.g., `https://your-app.onrender.com`)

### Step 6: Verify Backend Deployment

Test the backend health endpoint:
```bash
curl https://your-app.onrender.com/api/auth/health
```

Should return: `"Server is running"`

---

## Part 2: Frontend Deployment on Netlify

### Step 1: Prepare Frontend for Production

1. Update `frontend/.env.production`:
   ```
   REACT_APP_API_BASE_URL=https://your-render-backend-url/api
   REACT_APP_ENV=production
   ```

2. Build locally to test:
   ```bash
   cd frontend
   npm run build
   ```

### Step 2: Connect Repository to Netlify

1. Log in to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Authorize Netlify to access your GitHub account
5. Select your repository

### Step 3: Configure Build Settings

1. **Build command**:
   ```bash
   npm run build
   ```

2. **Publish directory**:
   ```
   build
   ```

3. **Base directory** (if monorepo):
   ```
   frontend
   ```

### Step 4: Set Environment Variables

In Netlify dashboard (Site settings → Build & deploy → Environment):

```
REACT_APP_API_BASE_URL=https://your-render-backend-url/api
REACT_APP_ENV=production
```

### Step 5: Deploy

1. Netlify will automatically build and deploy
2. You'll receive a URL like `https://your-app.netlify.app`
3. Monitor deployment in the "Deploys" tab

### Step 6: Configure Domain (Optional)

If you have a custom domain:
1. Go to "Domain settings"
2. Add your custom domain
3. Update DNS records as instructed by Netlify

---

## Part 3: Database Connection Verification

### From Backend

The backend will connect to PostgreSQL automatically on startup.

Check logs for:
```
Hibernate: create table students ...
Hibernate: create table classes ...
```

If using `ddl-auto: create-drop`, the schema will be created automatically.

### From Frontend

The frontend will connect via the API. Test with:
```bash
# Get all students
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://your-render-backend-url/api/students
```

---

## Part 4: Troubleshooting

### Backend Issues

**Issue**: "Connection refused" error
- **Solution**: Check PostgreSQL service is running and database URL is correct

**Issue**: "JWT_SECRET not set"
- **Solution**: Add `JWT_SECRET` environment variable in Render dashboard

**Issue**: Build takes too long or fails
- **Solution**: Check Maven dependencies, ensure `pom.xml` is correct

### Frontend Issues

**Issue**: "API_BASE_URL is undefined"
- **Solution**: Set `REACT_APP_API_BASE_URL` in Netlify environment variables

**Issue**: CORS errors
- **Solution**: Ensure backend has CORS enabled (it does in `SchoolManagementApplication.java`)

**Issue**: Blank page after deployment
- **Solution**: Check browser console for errors, verify API_BASE_URL is correct

---

## Part 5: Post-Deployment Checklist

- [ ] Backend health check passes
- [ ] Frontend loads without errors
- [ ] Login works with demo credentials
- [ ] Can view dashboard
- [ ] Can create/edit/delete students
- [ ] Can create/edit finance users
- [ ] Can manage fees
- [ ] Can view reports
- [ ] Database persists data correctly
- [ ] API responses are fast

---

## Part 6: Monitoring & Maintenance

### Backend Monitoring (Render)

1. Check logs regularly for errors
2. Monitor response times
3. Set up alerts for failures

### Frontend Monitoring (Netlify)

1. Check build logs
2. Monitor page load times
3. Check for JavaScript errors

### Database Monitoring

1. Monitor connection pool
2. Check disk usage
3. Backup data regularly

---

## Part 7: Updates & Rollback

### Deploy Updates

```bash
git push origin main
```

Both Render and Netlify will automatically redeploy.

### Rollback to Previous Version

**On Render**:
1. Go to "Deploys"
2. Find the previous working deploy
3. Click "Redeploy"

**On Netlify**:
1. Go to "Deploys"
2. Click on the previous working deploy
3. Click "Publish deploy"

---

## Part 8: Security Best Practices

1. **Change default credentials** in DataInitializer.java before first production deploy
2. **Use strong JWT_SECRET** (minimum 64 characters, random)
3. **Enable HTTPS** (automatic with Render and Netlify)
4. **Set database password** to strong value
5. **Review CORS settings** - currently allows all origins
6. **Keep dependencies updated**
7. **Monitor logs** for suspicious activity

---

## Part 9: Performance Optimization

### Backend

- Use connection pooling (configured in `application-prod.yml`)
- Enable SQL batch processing
- Add database indexes for frequently queried columns

### Frontend

- Enable gzip compression
- Use lazy loading for components
- Optimize images
- Use production build

### Database

- Regular backups
- Monitor query performance
- Add indexes on foreign keys

---

## Support & Contact

For deployment issues:
1. Check Render/Netlify logs
2. Verify environment variables
3. Test API endpoints manually
4. Check GitHub Actions (if configured)

---

**Last Updated**: September 2024
