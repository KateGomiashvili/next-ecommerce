const Footer = () => {
    return(
        <footer className="w-full bg-[#d8f1ff] py-[30px]">
      <div
        className="max-w-[1200px] mx-auto flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-8 px-6 text-black"
      >
        <div className="min-w-[200px]">
          <a href="index.html" className="text-2xl font-bold text-blue-600"
            >OnlineShop</a
          >
          <div>Online shop for everyone</div>
        </div>

        <div className="min-w-[150px]">
          <div className="font-bold mb-[5px]">Quick links</div>
          <a href="index.html"
            ><p className="hover:text-blue-600 transition">Home</p></a
          >
          <a href="products.html"
            ><p className="hover:text-blue-600 transition">Shop</p></a
          >
          <a href="about.html"
            ><p className="hover:text-blue-600 transition">About</p></a
          >
        </div>

        <div className="min-w-[150px]">
          <div className="font-bold mb-[5px]">Shop</div>
          <a href="products.html?category=beauty"
            ><p className="hover:text-blue-600 transition">Beauty</p></a
          >
          <a href="products.html?category=furniture"
            ><p className="hover:text-blue-600 transition">Furniture</p></a
          >
          <a href="products.html?category=fragrances"
            ><p className="hover:text-blue-600 transition">Fregnance</p></a
          >
        </div>

        <div className="min-w-[150px]">
          <div className="font-bold mb-[5px]">Help</div>
          <a href="/"><p className="hover:text-blue-600 transition">FAQ's</p></a>
          <a href="/"
            ><p className="hover:text-blue-600 transition">Return Policy</p></a
          >
          <a href="/"
            ><p className="hover:text-blue-600 transition">Order status</p></a
          >
        </div>
      </div>
    </footer>
    );
}
export default Footer;