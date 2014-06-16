<?php
$cicx = new CICX();
if(isset($_GET['save'])) $cicx->save();

class Access {
	const DB_NAME = 'testedebondade';
	const DB_HOST = 'localhost';
	const DB_USER = 'root';
	const DB_PASSWORD = 'root';
	public $db;
}


class CICX extends Access {

	# Create the PDO database object
    public function __construct() {
		try {
			$this->db = new PDO('mysql:dbname=' . self::DB_NAME . ';host=' . self::DB_HOST, self::DB_USER, self::DB_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		} catch (PDOException $e) {
			file_put_contents('PDOErrors.txt', date('d-m-Y H:i:s') . ' - ' . $e->getMessage() . "\r\n", FILE_APPEND);
		}
	}

	public function save(){
		$data = array(
			':name' => $_POST['name'],
			':age' => $_POST['age'],
			':gender' => $_POST['gender'],
			':religion' => $_POST['religion'],
			':answers' => $_POST['answers']
		);

		@$this->db
			->prepare("INSERT INTO teste (name, age, gender, religion, answers)
				VALUES (:name, :age, :gender, :religion, :answers)")
			->execute($data);
	}
}