# Future vs Present Personality Quiz

A fun, interactive mini-game that helps users discover whether they're more future-focused or present-minded through 7 carefully crafted questions.

## 🎮 How It Works

- Answer 7 questions by choosing between option A or B
- Each choice contributes to your final score
- Get one of two outcomes based on your accumulated score:
  - **Future-Focused** (score ≥ 4): You're a forward-thinking planner
  - **Present-Minded** (score < 4): You live in the moment

## 🚀 Hosting on GitHub Pages

### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub
2. Upload `index.html`, `style.css`, and `script.js` files
3. Go to repository Settings → Pages
4. Under "Source", select "main" branch
5. Click Save
6. Your site will be live at `https://yourusername.github.io/repository-name/`

### Option 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Future vs Present Quiz"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings as described in Option 1.

## 🛠️ Technologies Used

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (no dependencies)

## 📱 Features

- Fully responsive design
- Smooth animations and transitions
- Progress bar tracking
- Beautiful gradient color scheme
- Mobile-friendly interface

## 🎨 Customization

You can easily customize:
- Questions in `script.js` (questions array)
- Colors in `style.css` (gradient values)
- Result descriptions in `script.js` (showResults function)
- Scoring threshold (currently set at 4 out of 7)

## 📄 License

Feel free to use and modify this project for personal or educational purposes!
