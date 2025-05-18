#!/bin/bash

echo "CIAB Printer - Astro Web Application Setup"
echo "=========================================="
echo ""

# Function to display help
show_help() {
  echo "Usage: ./setup.sh [OPTION]"
  echo "Setup and run the CIAB Printer Astro application."
  echo ""
  echo "Options:"
  echo "  -h, --help     Display this help message and exit"
  echo "  -d, --dev      Start development server (default)"
  echo "  -b, --build    Build for production"
  echo "  -p, --preview  Build and preview production build"
  echo ""
  echo "Examples:"
  echo "  ./setup.sh            # Install dependencies and start dev server"
  echo "  ./setup.sh --build    # Build for production"
}

# Parse arguments
MODE="dev"

if [ $# -gt 0 ]; then
  case "$1" in
    "-h"|"--help")
      show_help
      exit 0
      ;;
    "-d"|"--dev")
      MODE="dev"
      ;;
    "-b"|"--build")
      MODE="build"
      ;;
    "-p"|"--preview")
      MODE="preview"
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
fi

# Install dependencies
echo "Installing dependencies..."
npm install

echo ""

# Run selected mode
case "$MODE" in
  "dev")
    echo "Starting development server..."
    npm run dev
    ;;
  "build")
    echo "Building for production..."
    npm run build
    echo "Build completed! Output is in the dist/ directory."
    ;;
  "preview")
    echo "Building for production..."
    npm run build
    echo "Starting preview server..."
    npm run preview
    ;;
esac 