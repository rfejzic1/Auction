name := """rest-api"""
organization := "com.github.rfejzic1"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.13.1"

libraryDependencies ++= Seq(
  guice,
  javaJpa,
  javaJdbc,
  filters,
  "org.hibernate" % "hibernate-core" % "5.4.9.Final",
  "org.postgresql" % "postgresql" % "42.2.9",
  "org.projectlombok" % "lombok" % "1.18.12" % "provided",
  "io.jsonwebtoken" % "jjwt" % "0.9.1",
  "org.mindrot" % "jbcrypt" % "0.4"
)

PlayKeys.externalizeResources := false

