<?php

namespace Illuminate\Foundation\Testing\Constraints;

class IsChecked extends FormFieldConstraint {
	/**
	 * Create a new constraint instance.
	 *
	 * @param string $selector        	
	 * @return void
	 */
	public function __construct($selector) {
		$this->selector = $selector;
	}
	
	/**
	 * Get the valid elements.
	 *
	 * @return string
	 */
	protected function validElements() {
		return "input[type='checkbox']";
	}
	
	/**
	 * Determine if the checkbox is checked.
	 *
	 * @param \Symfony\Component\DomCrawler\Crawler|string $crawler        	
	 * @return bool
	 */
	public function matches($crawler) {
		$crawler = $this->crawler ( $crawler );
		
		return $this->field ( $crawler )->attr ( 'checked' ) !== null;
	}
	
	/**
	 * Return the description of the failure.
	 *
	 * @return string
	 */
	protected function getFailureDescription() {
		return "the checkbox [{$this->selector}] is checked";
	}
}