BEGIN TRANSACTION;

-- user --
// comment

DEFINE TABLE user SCHEMAFULL
    PERMISSIONS
        FOR select,create,update,delete 
            WHERE id = $auth.id;
DEFINE FIELD firstName ON user TYPE string;
DEFINE FIELD lastName ON user TYPE string;
DEFINE FIELD email ON user TYPE string
    ASSERT string::is::email($value);
DEFINE FIELD pass ON user TYPE string;
//index
DEFINE INDEX userEmailIndex ON user FIELDS email UNIQUE;

-- task --
DEFINE TABLE task SCHEMAFULL
    PERMISSIONS
        FOR select,create,update,delete
            WHERE created_by = $auth.id;
DEFINE FIELD name ON task TYPE string;
DEFINE FIELD description ON task TYPE string DEFAULT "";
DEFINE FIELD state ON task TYPE string DEFAULT "pending"
    ASSERT $value IN ["pending","progressing","finished"];
DEFINE FIELD udated_at ON task TYPE datetime DEFAULT time::now();
DEFINE FIELD created_at ON task TYPE datetime DEFAULT time::now() READONLY;
DEFINE FIELD created_by ON task TYPE record(user) DEFAULT $auth.id READONLY;

-- EVENT --

DEFINE EVENT user_deleted ON user WHEN ($event = "DELETE") THEN {
    DELETE task where created_by = $before.id
};

-- SCOPE --

DEFINE SCOPE account SESSION 1d
    SIGNIN ( select * from user where email = $email AND crypto::argon2::compare(pass, $pass) )
    SIGNUP ( CREATE user SET email = $email, firstName = $firstName, lastName = $lastName, pass = crypto::argon2::generate($pass) );

-- TOKEN --

DEFINE TOKEN account_token ON SCOPE account TYPE HS512 VALUE "2569807b97bc040debdc6cc2bcd9100779da2a5e96885960c372a96737f7917f5f983e6e3428f6d0807742338c7e4c859343d4866e921fec4b3e7414bcd84118";

COMMIT TRANSACTION;