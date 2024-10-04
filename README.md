# Project Documentation

## 1. Project Overview
 This project is designed to manage and display a table of chemical properties, allowing users to interact with data through icons for adding, deleting, saving, sorting rows, downloading and refreshing the content. The design emphasizes ease of use, responsiveness, and accessibility across devices, particularly focusing on small, medium, and large screens.

## 2. Design Approach

### 2.1. Layout and Structure
The application layout follows a responsive, grid-based design approach, ensuring usability across different screen sizes. The main container (#container) uses relative positioning to enable flexibility within the page.
For larger screens (xl breakpoint), the layout shifts elements with left margins (xl:ml-64) and centers the table in view. For smaller screens (md and sm breakpoints), the layout adjusts with centralized content (md:justify-center, sm:items-center), making it user-friendly on mobile devices.

### 2.2. Icon Placement and Design
The icons for key actions (Add, Delete, Up, Down, Refresh, Save) are arranged horizontally in a flexbox layout (space-x-3) for consistent spacing. These icons are intuitive representations of user actions, making the interface simple and easy to navigate.
The icons are sized to w-6 to ensure they are visible yet non-intrusive. To enhance usability on smaller screens, icons are responsive and scale down proportionally.

## 3. Technology and Tools Used
- **HTML & CSS & Tailwind CSS**: For UI styling.
- **JavaScript**: Handles table sorting logic.
- **SVG Icons**: Provides scalable icons...

## 4. Functionalities

- **Add a row:** Click on + icon to add a new row in table.

- **Save the changes:** Click on save icon[second icon from the right].

- **Move rows:** Select a row and click on up or down arrow to move the selected row towards top or bottom.

- **Sort rows lexicographically & numerically:** Click on the column header to sort the table with respect to the column.

- **Edit a cell data:** Double click on a particular cell to edit that data and click save.

- **Download the table:** You can download the table instace in excel format by clicking on download icon[last icon].

## 5. Hosting 
The project is hosted on Netlify.
## Live Demo
You can view the live demo of the project [here](https://rohan-table.netlify.app/).

