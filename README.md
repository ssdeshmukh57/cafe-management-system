# Brew & Bite Cafe Management System

हा एक आधुनिक आणि आकर्षक वेब-आधारित कॅफे बिलिंग आणि मेनू व्यवस्थापन प्रोजेक्ट आहे.

## वैशिष्ट्ये (Features)
- **Aesthetic UI Design:** रिअल कॅफे व्हाइब देणारा मॉडर्न इंटरफेस.
- **Admin Form:** स्क्रीनवरून नवीन आयटम आणि किंमत जोडण्याची सुविधा.
- **Interactive POS Billing:** आयटमवर क्लिक करून रिअल-टाईम कार्ट अपडेट.
- **GST Calculation:** 5% ऑटोमॅटिक GST आणि Grand Total ची गणना.
- **Print Invoice:** 1-क्लिक बिल प्रिंट सुविधा.

## वापरलेले तंत्रज्ञान (Tech Stack)
- HTML5
- CSS3 (Custom Styles, CSS Variables, Responsive Grid)
- JavaScript (DOM Manipulation, Array Management)
- GSAP (GreenSock Animation Platform)

---

## 🎨 Design Architecture & Principles

### 1. Interface Planning
Interface planning lays the functional and strategic foundation of the system, bridging user goals with cashier efficiency:
* **Information Architecture (IA)**: Clear separation between operational billing (`index.html`) and customer visual browsing (`customer.html`).
* **User Flow Mapping**: Optimized step-by-step cashier workflows (Item Selection ➔ Quantity Adjustment ➔ Tax Calculation ➔ Receipt Generation ➔ Sales History Update).
* **Wireframing & Layout Boundaries**: High-contrast operational zones with fixed cart placement to reduce cognitive load during peak hours.

### 2. Visual Systems & UI Consistency
A cohesive visual hierarchy using structured design tokens and consistent design elements suited for premium culinary branding:
* **Consistent Typography**: Modular typographic scale using `Playfair Display` for bold brand headings and `Poppins` for readable menu items, prices, and thermal print receipts.
* **Design Tokens & Color Palette**:
  * `--primary-dark`: `#120a06` (Deep Espresso)
  * `--primary-brown`: `#2e1a0e` (Dark Roast)
  * `--accent-gold`: `#e5b869` (Warm Gold)
  * `--bg-light`: `#f9f6f0` (Cream/Ivory)
* **Visual Hierarchy**: Strategic use of font weights, sizes, and colors to immediately direct focus to item prices, total calculations, and action buttons.

### 3. Layout Systems & Spacing
Structural layout alignment and standardized spacing that organize UI components logically:
* **Consistent Spacing System**: Based on a standardized $8\text{px}$ spatial system for uniform padding, margins, and component gaps across all pages.
* **Grid Systems**: Flexible CSS Grid (`repeat(auto-fill, minmax(140px, 1fr))`) for fluid item display.
* **Dual-Column Billing Layout**: 60/40 split screen balancing interactive menu grids with active order checkout summaries.

### 4. Modular UI Components & Prototyping
Reusable components and interactive animations designed to deliver immediate tactile feedback to staff and customers:
* **Reusable UI Components**: Standardized cards, action buttons, table rows, modal forms, and toast notifications maintaining visual consistency throughout the app.
* **Micro-interactions**: Interactive GSAP scale and spring physics animations when clicking menu items or button triggers.
* **Status Feedback**: Floating toast notifications confirming customer item additions.
* **State Management**: Dynamic UI table updates reflecting quantity additions, deletions, and live totals.

### 5. Responsive Design, Multi-Device Optimization & Print
Multi-device adaptability, cross-platform interactions, and physical media transformation:
* **Cross-Device Optimization**: Layouts and interactions are fully optimized across Desktop, Tablet, and Mobile screens for seamless touch and click workflows.
* **Mobile & Tablet Adaptation**: Dynamic flex container wrapping and adaptive grid columns for small screen viewports.
* **Fluid Layouts**: Sizing components with relative units (`vh`, `vw`, `%`, `rem`) for consistent scaling across devices.
* **Print Stylesheet (`@media print`)**: Dedicated print rules hiding navigation bars, operational buttons, and sidebars to render thermal-receipt-friendly outputs.