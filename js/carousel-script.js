async function initCarouselWithUnsplash() {
    let imgsContainer = document.querySelector(".img-container");
    let buttonsNode = imgsContainer.querySelector('.buttons');

    // Using a curated array of high-quality Unsplash image URLs for the free wallpapers.
    // If you ever want to use the actual Unsplash API `fetch()`, you will need an access key (client_id). 
    // You can replace out this array with a fetch call if needed later!
    const unsplashWallpapers = [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop"
    ];

    unsplashWallpapers.forEach((url, i) => {
        let img = document.createElement("img");
        img.src = url;
        img.alt = `Unsplash Wallpaper ${i + 1}`;
        img.loading = "lazy";

        // Applying dimensions requested using style object:
        img.style.width = "100%";
        img.style.height = "100vh";
        img.style.objectFit = "cover";

        imgsContainer.insertBefore(img, buttonsNode);
    });

    // --- START OF CAROUSEL LOGIC ---
    //#region catch elements
    let nextBtn = document.getElementById("next")
    let prevBtn = document.getElementById("prev")
    let indecators = document.getElementById("indecators")
    let ulElement = document.createElement("ul");
    ulElement.setAttribute("id", "pagination")
    //#endregion


    //#region variables
    // Now that images are dynamically added, query them!
    let imgs = Array.from(document.querySelectorAll(".img-container img"));
    let intervalTime = parseInt(imgsContainer.getAttribute("data-interval"));
    let slidesCount = imgs.length;
    let curSlide = 1;
    //#endregion


    //#region indecators
    for (let index = 1; index <= slidesCount; index++) {
        let liElement = document.createElement("li");
        ulElement.appendChild(liElement);
    }
    indecators.appendChild(ulElement);
    //#endregion


    //#region pagination
    // To fix pagination access, we find it after we append `ulElement` above.
    let pagination = document.getElementById("pagination");

    function changeClass() {
        RemoveClass()
        imgs[curSlide - 1].classList.add("active");
        pagination.children[curSlide - 1].classList.add("active")
    }
    // firing the function to start showing images
    changeClass()
    //#endregion


    //#region buttons
    nextBtn.onclick = () => {
        next();
        resetInterval();
    };
    prevBtn.onclick = () => {
        prev();
        resetInterval();
    };
    // li clicks
    for (let i = 0; i < slidesCount; i++) {
        pagination.children[i].onclick = () => {
            curSlide = i + 1;
            changeClass();
            resetInterval();
        }
    }
    //#endregion


    //#region functions
    function RemoveClass() {
        imgs.forEach((e) => e.classList.remove("active"));

        for (let e of pagination.children)
            e.classList.remove("active");
    }

    function next() {
        if (curSlide == slidesCount)
            curSlide = 0;
        curSlide++;
        changeClass()
    }

    function prev() {
        if (curSlide == 1)
            curSlide = slidesCount + 1;

        curSlide--;
        changeClass()
    }
    //#endregion

    //#region change image interval
    let interval = setInterval(next, intervalTime);

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(next, intervalTime);
    }
    //#endregion
}

// Call the new async wrapper instantly:
initCarouselWithUnsplash();