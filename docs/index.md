## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/SCCapstone/StockPrediction/edit/master/docs/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.


## Video

<header class="header">
  <h1 class="header__title">Embedded Video with Placeholder Image</h1>
  <a href="https://codepen.io/praliedutzel/post/full-width-embedded-videos-with-placeholder-images" target="_blank">Read the Article</a>
</header>

<section class="video">
  <img src="http://placehold.it/350x150" data-video="https://www.youtube.com/embed/q3Dt6kI-ajA?autoplay=1" title="Play Video" class="video__placeholder" />
  <button class="video__button"></button>
</section>
$video-height: 50vh;

.video {
  height: $video-height;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.video__placeholder { min-width: 100%; display: block; }

.video__button {
  background: transparent;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  position: absolute;
  display: block;
  border: 3px solid #232439;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%) translateY(-50%);
  
  &:before,
  &:after {
    content: "";
    position: absolute;
    display: block;
    background-color: #232439;
    width: 35px;
    height: 3px;
    top: 50%;
    left: 35%;
    transition: background-color 0.3s;
  }
  
  &:before { transform: translateY(-11px) rotate(45deg); }
  &:after { transform: translateY(11px) rotate(-45deg); }
  
  &.is-playing {
    top: 1rem;
    right: 1rem;
    left: auto;
    transform: none;
  }
  
  &.is-playing:before,
  &.is-playing:after { left: 32%; }
  
  &.is-playing:before { transform: translateY(0) rotate(45deg); }
  &.is-playing:after { transform: translateY(0) rotate(-45deg); }
}
.video:hover .video__button {
  border-color: #6ddce5;
  
  &:before,
  &:after {
    background-color: #6ddce5;
  }
}

#video-player {
  width: 100%;
  height: $video-height;
  top: 0;
  left: 0;
  position: absolute;
  display: block;
}

// The code below this point is used for styling the demo
@at-root {
  body {
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
    font-family: "Open Sans", Helvetica Neue, Helvetica, Arial, sans-serif;
    text-align: center;
  }

  .header {
    background-color: #232439;
    padding: 4rem 2rem;
    text-align: center;
    
    a {
      margin-top: 1rem;
      display: block;
      color: #6ddce5;
      font-size: 0.85rem;
      text-decoration: none;
    }
  }

  .header__title {
    margin: 0;
    color: #fff;
    font-weight: 300;
  }
}
$('.video__placeholder, .video__button').on('click', function() {
  if ( !$('#video-player').length ) {
    var video = '<iframe id="video-player" src="' + $('.video__placeholder').attr('data-video') + '" frameborder="0" allowfullscreen wmode="opaque"></iframe>';
    $(video).insertAfter( $('.video__placeholder') );
    $('.video__button').addClass('is-playing');
  } else {
    $('.video__button').removeClass('is-playing');
    $('#video-player').remove();
  }
});








### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/SCCapstone/StockPrediction/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out.
