import React from "react";
import EmailIcon from '@mui/icons-material/Email';

export const Footer = () => {
  return (
    <footer className="footer bg-white relative pt-1 border-t-2 border-gray-300 mb-1">
      <div className="container mx-auto px-6">

        <div className="sm:flex sm:mt-8">
          <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
            <div className="flex flex-col">
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">Contact</span>
              <a href="mailto:belkacem@mpg-scout.com" >
                <EmailIcon />
              </a>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">Contribute</span>
              <a href="https://www.buymeacoffee.com/belkacemb"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" style={{"height": "60px"}} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}
