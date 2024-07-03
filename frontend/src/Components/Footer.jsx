import React from "react";
// import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="max-w-[90%] mx-auto my-5 bg-[#1A1B1D] text-white p-5 rounded-xl">
        <div className="flex flex-col md:flex-row gap-3 justify-around">
          <div className="item">
            <h2 className="font-semibold">Categories</h2>
            <a href="#" className="hidden md:block">Graphics & Design</a>
            <a href="#" className="hidden md:block">Digital Marketing</a>
            <a href="#" className="hidden md:block">Writing & Translation</a>
            <a href="#" className="hidden md:block">Video & Animation</a>
            <a href="#" className="hidden md:block">Music & Audio</a>
            <a href="#" className="hidden md:block">Programming & Tech</a>
            <a href="#" className="hidden md:block">Data</a>
            <a href="#" className="hidden md:block">Business</a>
            <a href="#" className="hidden md:block">Lifestyle</a>
            <a href="#" className="hidden md:block">Photography</a>
            <a href="#" className="hidden md:block">Sitemap</a>
          </div>
          <hr className="block md:hidden" />
          <div className="item">
            <h2 className="font-semibold">About</h2>
            <a href="#" className="hidden md:block">Press & News</a>
            <a href="#" className="hidden md:block">Partnerships</a>
            <a href="#" className="hidden md:block">Privacy Policy</a>
            <a href="#" className="hidden md:block">Terms of Service</a>
            <a href="#" className="hidden md:block">Intellectual Property Claims</a>
            <a href="#" className="hidden md:block">Investor Relations</a>
            <a href="#" className="hidden md:block">Contact Sales</a>
          </div>
          <hr className="block md:hidden" />
          <div className="item">
            <h2 className="font-semibold">Support</h2>
            <a href="#" className="hidden md:block">Help & Support</a>
            <a href="#" className="hidden md:block">Trust & Safety</a>
            <a href="#" className="hidden md:block">Selling on Fiverr</a>
            <a href="#" className="hidden md:block">Buying on Fiverr</a>
          </div>
          <hr className="block md:hidden" />
          <div className="item">
            <h2 className="font-semibold">Community</h2>
            <a href="#" className="hidden md:block">Customer Success Stories</a>
            <a href="#" className="hidden md:block">Community hub</a>
            <a href="#" className="hidden md:block">Forum</a>
            <a href="#" className="hidden md:block">Events</a>
            <a href="#" className="hidden md:block">Blog</a>
            <a href="#" className="hidden md:block">Influencers</a>
            <a href="#" className="hidden md:block">Affiliates</a>
            <a href="#" className="hidden md:block">Podcast</a>
            <a href="#" className="hidden md:block">Invite a Friend</a>
            <a href="#" className="hidden md:block">Become a Seller</a>
            <a href="#" className="hidden md:block">Community Standards</a>
          </div>
          <hr className="block md:hidden" />
          <div className="item">
            <h2 className="font-semibold">More From Fiverr</h2>
            <a href="#" className="hidden md:block">Fiverr Business</a>
            <a href="#" className="hidden md:block">Fiverr Pro</a>
            <a href="#" className="hidden md:block">Fiverr Logo Maker</a>
            <a href="#" className="hidden md:block">Fiverr Guides</a>
            <a href="#" className="hidden md:block">Get Inspired</a>
            <a href="#" className="hidden md:block">Fiverr Select</a>
            <a href="#" className="hidden md:block">ClearVoice</a>
            <a href="#" className="hidden md:block">Fiverr Workspace</a>
            <a href="#" className="hidden md:block">Learn</a>
            <a href="#" className="hidden md:block">Working Not Working</a>
          </div>
        </div>
        <div className="bottom">
          <hr className="mt-5" />
        <div className="pt-2 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 ">
            <h2 className="font-bold text-4xl text-gray-300">GigVerse.</h2>
            <a href="#" className="block">© GigVerse International Ltd. 2024</a>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-14 mt-4 md:mt-0">
            <div className="flex gap-5">
              <img src="/images/twitter.png" className="w-[30px] h-[30px]" alt="Twitter" />
              <img src="/images/facebook.png" className="w-[30px] h-[30px]" alt="Facebook" />
              <img src="/images/linkedin.png" className="w-[30px] h-[30px]" alt="LinkedIn" />
              <img src="/images/pinterest.png" className="w-[30px] h-[30px]" alt="Pinterest" />
              <img src="/images/instagram.png" className="w-[30px] h-[30px]" alt="Instagram" />
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/language.png" className="w-[30px] h-[30px]" alt="Language" />
              <a href="#" className="block">English</a>
              <img src="/images/coin.png" className="w-[30px] h-[30px]" alt="Currency" />
              <a href="#" className="block">USD</a>
            </div>
            <img src="/images/accessibility.png" className="border border-gray-400 rounded-full p-2 w-10" alt="Accessibility" />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;