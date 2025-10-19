import ProductImg from "../../public/img-1.jpg";
export default function ProductsPage() {
  return (
    <div className="products">
      <div className="img">
        <img src={ProductImg} alt="products-img" />
      </div>
      <div className="text">
        <h3>About WorldWide</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ipsum
          assumenda optio exercitationem est quos, mollitia odio officiis
          perspiciatis sed reiciendis nisi corrupti possimus placeat repudiandae
          iure atque numquam? Sequi.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
          recusandae aut quos delectus dignissimos, assumenda incidunt esse.
        </p>
      </div>
    </div>
  );
}
