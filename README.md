# 🎓 Campus Event Management System (IGDTUW)

A full-stack web application built for **IGDTUW** to manage societies, events, and student participation in a centralized platform.

---

## Tech Stack

- Frontend: React + TypeScript + Vite  
- Styling: Tailwind CSS  
- Backend: Supabase (Auth + Database + Storage)  
- Deployment: Vercel  

---

## Authentication

- Email/password login using Supabase  
- Role-based access:
  - `organizer`
  - `student`
  - `faculty`
  - `society_member`

---

## Core Features

- 📅 Create & manage events (organizer)
- 👥 Add and manage team members
- 📖 Dynamic society pages (no hardcoding)
- 🏆 Achievements & highlights section
- 🖼️ Gallery upload (Supabase Storage)
- 🔗 Social links management
- 📊 View registrations per event

---

## Database (Supabase)

### profiles
- id, name, email, role, society  
- about, instagram, linkedin, email_contact  

### events
- title, description, date, time, venue  
- created_by, attendance controls  

### registrations
- user_id, event_id  

### achievements
- title, description, society  

### gallery
- image_url, society  

---

## Deployment

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```
- Deploy on Vercel
- Set root directory → frontend
- Add environment variables:
  - VITE_SUPABASE_URL=your_url
  - VITE_SUPABASE_ANON_KEY=your_key

---

## Notes
- Society names should be lowercase (e.g., rotaract)
- Organizer controls all society data
- Members must sign up before being added

---

## Future Enhancement 
- Activating faculty supervisor's and society member's dashboard still needs to be done
- Customising outsiders' profile for their comfort
- adding info of all societies in the society page (for now it is only of rotaract and gdg)
