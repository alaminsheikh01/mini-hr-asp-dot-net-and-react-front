'use client';
import React,{useEffect} from 'react';
export default function HomePage() {

  useEffect(() =>{
    document.title = "Home - Employee Management";
  }, []);

    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Welcome to the Employee Management App</h1>
        <p>Select a section from the navigation above to get started.</p>
      </div>
    );
  }
