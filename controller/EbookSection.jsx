import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react"; // Importing book icon

const EbookSection = () => {
  const [books, setBooks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/ebooks/list")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setTimeout(() => setIsLoaded(true), 300); // Smooth fade-in effect
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <motion.div 
      style={styles.container} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2 
        style={styles.heading}
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        📚 Explore Our Ebooks
      </motion.h2>

      <motion.div 
        style={styles.grid}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        {books.map((book, index) => (
          <motion.div 
            key={index} 
            style={styles.bookCard} 
            className="book-card"
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.5, delay: index * 0.1 }} 
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(145, 0, 223, 0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 style={styles.bookTitle}>{book.split(".")[0]}</h3>
            <motion.button
              whileTap={{ scale: 0.95 }}
              style={styles.readButton}
              className="read-btn"
              onClick={() => window.open(`http://localhost:8080/api/ebooks/${book}`, "_blank")}
            >
              <BookOpen size={20} style={{ marginRight: "8px" }} /> Read Book
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Extra Styles & Effects */}
      <style>
        {`
          /* Glowing Border Effect on Hover */
          .book-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
            position: relative;
          }

          .book-card:hover {
            border: 3px solid rgba(145, 0, 223, 0.8);
            box-shadow: 0 15px 40px rgba(145, 0, 223, 0.4);
          }

          /* Floating Animation */
          .book-card:nth-child(even) {
            animation: float 3s ease-in-out infinite alternate;
          }

          .book-card:nth-child(odd) {
            animation: float 3s ease-in-out infinite alternate-reverse;
          }

          @keyframes float {
            from { transform: translateY(0px); }
            to { transform: translateY(-8px); }
          }
        `}
      </style>
    </motion.div>
  );
};

// 🎨 Styling
const styles = {
  container: {
    textAlign: "center",
    padding: "50px 20px",
    background: "linear-gradient(to right, #ffffff, #f5f5f5)",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#9100df",
    marginBottom: "30px",
    textShadow: "2px 2px 10px rgba(145, 0, 223, 0.3)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 cards per row
    gap: "20px", // Space between cards
    justifyContent: "center",
    padding: "10px",
  },
  bookCard: {
    background: "#fff",
    border: "2px solid #9100df",
    borderRadius: "12px",
    padding: "20px",
    width: "250px",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    minHeight: "180px", // Ensure proper spacing
  },
  bookTitle: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#9100df",
    marginBottom: "10px",
  },
  readButton: {
    background: "#9100df",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    transition: "background 0.3s ease, transform 0.2s ease",
  },
};

export default EbookSection;
