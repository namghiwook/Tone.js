define(["Tone/core/Tone", "Tone/component/Compressor"], function(Tone){

	"use strict";

	/**
	 *  @class Limit the loudness of the incoming signal. Composed of a Tone.Compressor
	 *         with a fast attack and release. 
	 *
	 *  @extends {Tone}
	 *  @constructor
	 *  @param {number} threshold The theshold above which the limiting is applied. 
	 *  @example
	 *  var limiter = new Tone.Limiter(-6);
	 */
	Tone.Limiter = function(threshold){

		/**
		 *  the compressor
		 *  @private
		 *  @type {Tone.Compressor}
		 */
		this._compressor = this.input = this.output = new Tone.Compressor({
			"attack" : 0.001,
			"decay" : 0.001,
			"threshold" : threshold
		});

		/**
		 * The threshold of of the limiter
		 * @type {Decibel}
		 * @signal
		 */
		this.threshold = this._compressor.threshold;

		this._readOnly("threshold");
	};

	Tone.extend(Tone.Limiter);

	/**
	 *  Clean up.
	 *  @returns {Tone.Limiter} this
	 */
	Tone.Limiter.prototype.dispose = function(){
		Tone.prototype.dispose.call(this);
		this._compressor.dispose();
		this._compressor = null;
		this._writable("threshold");
		this.threshold = null;
		return this;
	};

	return Tone.Limiter;
});