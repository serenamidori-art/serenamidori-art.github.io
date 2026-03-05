function handleClick(direction) {
  const list = document.querySelector(".carousel-list");
  const item = document.querySelector(".item");
  const itemWidth = item.offsetWidth;
  
  if (direction === "previous") {
    list.scrollBy({ left: -itemWidth, behavior: "smooth" });
  } else {
    list.scrollBy({ left: itemWidth, behavior: "smooth" });
  }
}