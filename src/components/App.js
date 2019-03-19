import React from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import youtube from "../api/youtube";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null
  };

  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  };

  onSearchSubmit = async term => {
    const response = await youtube.get("/search", {
      params: {
        q: term
      }
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  getContent() {
    if (!!this.state.selectedVideo) {
      return (
        <div className={"ui container"} style={{ marginTop: "10px" }}>
          <SearchBar search={this.onSearchSubmit} />
          <div className={"ui grid"}>
            <div className={"ui row"}>
              <div className={"eleven wide column"}>
                <VideoDetail video={this.state.selectedVideo} />
              </div>
              <div className={"five wide column"}>
                <VideoList
                  videos={this.state.videos}
                  onVideoSelect={this.onVideoSelect}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui container">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    this.onSearchSubmit("trucks");
  }

  render() {
    return this.getContent();
  }
}

export default App;
