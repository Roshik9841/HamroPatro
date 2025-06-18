# HamroPatro

A modern React application built with Vite, featuring SWR for data fetching and Tailwind CSS for styling.

## 🚀 Features

- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 18** - Latest React with JSX support
- 🔄 **SWR** - React Hooks for data fetching and caching
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔥 **Hot Module Replacement (HMR)** - Instant updates during development
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **TypeScript Ready** - Full TypeScript support

## 🛠️ Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR
- **Language**: JavaScript (JSX)
- **Package Manager**: npm

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
HamroPatro/
├── index.html              # Main HTML file
├── src/
│   ├── main.jsx           # Application entry point
│   ├── App.jsx            # Main App component
│   └── index.css          # Global styles with Tailwind
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── .eslintrc.cjs          # ESLint configuration
```

## 🔄 SWR Features Demonstrated

The app showcases SWR's powerful features:

- **Automatic Caching** - Data is cached and reused
- **Real-time Updates** - Data stays fresh automatically
- **Request Deduplication** - Multiple requests for same data are deduplicated
- **Focus Revalidation** - Data revalidates when window regains focus
- **Optimistic Updates** - UI updates immediately while data syncs
- **Error Handling** - Graceful error states
- **Loading States** - Beautiful loading indicators

## 🎨 UI Features

- **Modern Design** - Clean, modern interface with gradients
- **Interactive Elements** - Buttons for navigation and refresh
- **Responsive Layout** - Works on all screen sizes
- **Smooth Animations** - Loading spinners and transitions
- **Glass Morphism** - Semi-transparent cards with backdrop blur

## 🚀 Performance Benefits

- **Vite's Speed** - Instant server start and hot reload
- **SWR's Efficiency** - Smart caching reduces API calls
- **Tailwind's Optimization** - Only includes used CSS
- **Modern ES Modules** - Better tree shaking and loading

## 🔧 Configuration Files

- **`vite.config.js`** - Vite build configuration
- **`tailwind.config.js`** - Tailwind CSS customization
- **`postcss.config.js`** - PostCSS plugins (Tailwind + Autoprefixer)
- **`.eslintrc.cjs`** - Code linting rules

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Next Steps

You can extend this project by:

1. Adding more SWR examples
2. Implementing authentication
3. Adding more UI components
4. Setting up testing with Vitest
5. Adding TypeScript for better type safety 