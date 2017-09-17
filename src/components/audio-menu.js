import React, { Component } from 'react'
import song from '../audio/ninja.mp3'
import $ from 'jquery'

class AudioMenu extends Component {
	componentDidMount() {
		$('audio').trigger("play")
	}
  render() {
    return (
        <audio src={song} {...this.props}>
			<p>If you are reading this, it is because your browser does not support the audio element.</p>
		</audio>
    )
  }
}

export default AudioMenu