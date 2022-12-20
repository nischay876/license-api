CREATE TABLE `facebookc` (
  `user_id` int(11) NOT NULL,
  `domain_name` varchar(100) NOT NULL,
  `licence_key` varchar(100) NOT NULL,
  `customer_email` varchar(500) NOT NULL,
  `user_session_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `facebookc`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `facebookc`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;