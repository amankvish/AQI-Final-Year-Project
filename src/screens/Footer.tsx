import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="backdrop-blur text-white bg-black/50 py-1 text-center">
            <a
                className="S_Underline relative z-10 px-1 pt-1 hover:after:w-full"
                href="https://www.linkedin.com/in/amankvish/"
                target="_blank"
                rel="noreferrer"
            >
                Ⓒ Developed and Designed by <b>Aman K Vish</b>
            </a>
        </footer>
    );
};

export default Footer;
