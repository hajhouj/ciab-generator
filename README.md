# CIAB PDF Generator - Web Version

This is a web-based version of the CIAB PDF Generator application, built with Astro and React. The application generates PDF documents from Excel data using a predefined layout based on the original desktop application.

## Key Features

- **100% Client-Side Processing**: All data is processed entirely in the browser. No data is sent to any server.
- **Excel File Processing**: Upload Excel files with data or use the included sample data.
- **PDF Generation**: Generate PDFs with precise text positioning based on the CIAB layout.
- **Document Types**: Support for both "New Identification" and "Duplicata" document types.
- **Debug Mode**: Visualize text positions and coordinate grid for layout troubleshooting.
- **Font Size Adjustment**: Adjust text size for better readability.

## Technologies Used

- **[Astro](https://astro.build/)**: Fast, modern web framework
- **[React](https://reactjs.org/)**: UI components
- **[pdf-lib](https://pdf-lib.js.org/)**: PDF generation library
- **[xlsx](https://sheetjs.com/)**: Excel file processing
- **[Tailwind CSS](https://tailwindcss.com/)**: Styling

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

This will start the application at http://localhost:4321

### Building for Production

Build the application:

```bash
npm run build
```

This generates a static site in the `dist/` directory that can be deployed to any static hosting service.

### Preview Production Build

```bash
npm run preview
```

## Deployment

The application can be deployed to any static site hosting service:

### Netlify

The project includes a `netlify.toml` file for easy deployment to Netlify.

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings and deploy the site

### Other Hosting Options

- **Vercel**: Similar to Netlify, automatic deployment from Git
- **GitHub Pages**: Deploy the `dist/` directory
- **Any Static Hosting**: Upload the contents of the `dist/` directory to any static hosting service

## How It Works

1. **Data Processing**: The application reads Excel files using the xlsx.js library
2. **Layout Application**: It applies the embedded CIAB layout data to position text fields
3. **PDF Generation**: Using pdf-lib, it creates a PDF document with precisely positioned text
4. **Browser Download**: The generated PDF is provided as a download to the user

## Debug Mode

Enable debug mode to see:

- A coordinate grid with mm measurements
- Red position markers showing where text is placed
- Coordinate labels for each text element

This is particularly useful for troubleshooting layout issues.

## Font Size Adjustment

Use the font size slider to adjust text size between 8pt and 14pt for better readability while maintaining the same positioning.

## License

This project is licensed under the MIT License

## Acknowledgements

This application is a port of the original CIAB PDF Generator desktop application, developed to provide a web-based alternative with the same functionality. 