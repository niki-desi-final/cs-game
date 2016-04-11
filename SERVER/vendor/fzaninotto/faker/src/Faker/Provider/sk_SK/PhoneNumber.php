<?php

namespace Faker\Provider\sk_SK;

class PhoneNumber extends \Faker\Provider\PhoneNumber {
	protected static $formats = array (
			'+421 ### ### ###',
			'00421 ### ### ###',
			'#### ### ###',
			'00421#########',
			'+421#########',
			'########' 
	);
}
