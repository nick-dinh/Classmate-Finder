CREATE TABLE `messages` (
  `msgid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL DEFAULT '',
  `message` text,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `chatroom_id` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`msgid`),
  KEY `fk_room_id` (`chatroom_id`),
  CONSTRAINT `fk_room_id` FOREIGN KEY (`chatroom_id`) REFERENCES `chatrooms` (`chatid`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=latin1;

CREATE TABLE `chatrooms` (
  `chatid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `users` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`chatid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
