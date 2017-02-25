<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
<?php 
	/**
	*  
	*/
	class Person
	{
		
		function __construct($name, $sex)
		{
			$this->name = $name;
			$this->sex = $sex;
		}

		function showName(){
			echo $this->name;
		}

		function showSex(){
			echo $this->sex;
		}
	}

	/*$p1 = new Person('blue', 'male');
	$p1->showName();*/

	/**
	* 
	*/
	class Worker extends Person
	{
		
		function __construct($name, $sex, $job)
		{
			parent::__construct($name, $sex);

			$this->job = $job;
		}
	}



?>
</body>
</html>