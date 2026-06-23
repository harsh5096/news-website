import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

// This function takes a string as input and returns the same string with the first letter capitalized.
// It is used to set the document title later in the component.
const capitalizeFirstLetter = (string) =>{
return string.charAt(0).toUpperCase() + string.slice(1);
}



const News = (props) => {
// articles: Represents the array of news articles.
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)


// This function is responsible for fetching news data from the News API based on the provided props (such as country, category, and pageSize).
const updateNews = async () => {
  const query = props.category ? props.category : 'news';
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${props.pageSize}&apiKey=${apiKey}`;
  setloading(true);
  try {
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log('API Response:', parsedData);
    if (parsedData.status !== 'ok') {
      console.error('API Error:', parsedData.message || 'Unknown error');
      setarticles([]);
      settotalResults(0);
    } else {
      setarticles(parsedData.articles);
      settotalResults(parsedData.totalResults);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    setarticles([]);
    settotalResults(0);
  }
  setloading(false);
}

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Master-mind`;
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);


  // This function is called when the user scrolls to fetch more data for infinite scrolling.
  
  const fetchMoreData = async () => {
    const query = props.category ? props.category : 'news';
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    let url = `https://newsapi.org/v2/everything?q=${query}&page=${page + 1}&pageSize=${props.pageSize}&apiKey=${apiKey}`;
    setpage(page + 1);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log('API Response (more):', parsedData);
      if (parsedData.status !== 'ok') {
        console.error('API Error:', parsedData.message || 'Unknown error');
      } else {
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <>
      <div className="container my-5">
        <h3 className=" text-center" style={{ margin: "35px 0px", marginTop: "36px" }}>Master-mind - Top Headlines</h3>
    {/* This div displays a loading spinner (<Spinner />) only if the loading state is true. 
    It helps indicate to the user that content is being fetched or processed. */}
        <div>{loading && < Spinner />}</div>

        {/* The InfiniteScroll component is used for implementing infinite scrolling behavior. */}
        <InfiniteScroll
          //  dataLength is set to the current length of the articles array.
          dataLength={articles.length}
          //  next is a callback function (fetchMoreData) to load more data when the user scrolls to the bottom. 
          next={fetchMoreData}
          //  hasMore determines if there are more items to load based on the comparison between the current number of articles and the total results. 
          hasMore={articles.length !== totalResults}
          //  loader specifies the loading indicator, in this case, the <Spinner /> component. 
          loader={< Spinner />}
        >
          <div className="container">
            <div className=" row " >
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  {/* "". It checks if element.title exists; if it does, it uses element.title; otherwise, it defaults to an empty string (""). 
                  This is a way to handle cases where element.title might be undefined or null. */}
                  <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>

  )
}

// Default props are provided in case the parent component does not pass certain props.
News.defaultProps = {
  country: "us",
  pageSize: 10,
  category: "general"
}

// Prop types are used for type-checking to ensure that the expected data types are provided for each prop.
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
