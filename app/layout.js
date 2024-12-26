import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Employee Management App",
  description: "Manage employees, departments, and designations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <nav
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              gap: "10px",
            }}
          >
            <Link
              href="/"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Home
            </Link>
            <Link
              href="/component/EmpList"
              style={{
                padding: "10px 20px",
                backgroundColor: "#6C757D",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Employee List
            </Link>
            <Link
              href="/component/EmpCreate"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Create Employee
            </Link>
            <Link
              href="/component/DepCreate"
              style={{
                padding: "10px 20px",
                backgroundColor: "#28A745",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Create Department
            </Link>
            <Link
              href="/component/DegCreate"
              style={{
                padding: "10px 20px",
                backgroundColor: "#DC3545",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Create Designation
            </Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
