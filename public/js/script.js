const aplayer = document.querySelector("#aplayer");
if (aplayer) {
    const song = JSON.parse(aplayer.getAttribute("data-song"));
    const singer = JSON.parse(aplayer.getAttribute("data-singer"));
    const ap = new APlayer({
        container: aplayer,
        lrcType: 1,
        audio: [{
            name: song.title,
            artist: singer.fullName,
            url: song.audio,
            cover: song.avatar,
            lrc:song.lyrics
        }],
        autoplay: true,
        volume: 0.8
    });
    const avatar = document.querySelector(".singer-detail .inner-avatar");
    ap.on('play', function () {
        avatar.style.animationPlayState = "running"
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused"
    });
    ap.on('ended', function () {
        // Tạo API và fetch
        const link = `/songs/listener/${song._id}`;
        const option = {
            method: 'PATCH'
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const listenerSpan = document.querySelector(".singer-detail .inner-listen span");
                listenerSpan.innerHTML = `${data.listener}`;
            })
    });
}
// end aplayer

// button-like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const songId = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains("active");

        const typeLike = isActive ? "dislike" : "like";

        // Tạo API và fetch
        const link = `/songs/like/${typeLike}/${songId}`;
        const option = {
            method: 'PATCH'
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const span = buttonLike.querySelector("span");
                span.innerHTML = `${data.like} thich`;

                buttonLike.classList.toggle("active");
            })

    })
}
// end button-like
// button-favorite
const buttonFavorites = document.querySelectorAll("[button-favorite]");
if (buttonFavorites.length > 0) {
    buttonFavorites.forEach(buttonFavorite => {
        buttonFavorite.addEventListener("click", () => {
            const songId = buttonFavorite.getAttribute("button-favorite");
            const isActive = buttonFavorite.classList.contains("active");

            const typeFavorite = isActive ? "unfavorite" : "favorite";

            // Tạo API và fetch
            const link = `/songs/favorite/${typeFavorite}/${songId}`;
            const option = {
                method: 'PATCH'
            }
            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        buttonFavorite.classList.toggle("active");
                    }
                })

        })
    });
}
// end button-favorite

//search suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
    const input = boxSearch.querySelector('input[name="keyword"]');
    const boxSuggest = boxSearch.querySelector(".inner-suggest");

    input.addEventListener("keyup", () => {
        const keyword = input.value;
        // Tạo API và fetch
        const link = `/search/suggest?keyword=${keyword}`;

        fetch(link)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    console.log(data);
                    const songs = data.songs;
                    if (songs.length > 0) {
                        boxSuggest.classList.add("show");
                        const htmls = songs.map(song => {
                            return `
                                <a class="inner-item" href="/songs/detail/${song.slug}">
                                    <div class="inner-image">
                                        <img src=${song.avatar}>
                                    </div>
                                    <div class="inner-info">
                                        <div class="inner-title">${song.title} </div>
                                        <div class="inner-singer">
                                            <i class="fa-solid fa-microphone-lines"></i> ${song.fullName} </div>
                                        </div>
                                </a>
                            `
                        })
                        const boxList = boxSuggest.querySelector(".inner-list");
                        boxList.innerHTML = htmls.join("");
                    }
                    else {
                        boxSuggest.classList.remove("show");
                    }

                }
            })

    })
}
// end search suggest