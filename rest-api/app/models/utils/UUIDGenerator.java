package models.utils;

import org.hibernate.annotations.GenericGenerator;

@GenericGenerator(name = "UUID", strategy = "uuid2")
public @interface UUIDGenerator {}
