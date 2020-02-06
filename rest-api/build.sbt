name := """rest-api"""
organization := "com.github.rfejzic1"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.13.1"

libraryDependencies ++= Seq(
  guice,
  javaJpa,
  javaJdbc,
  "org.hibernate" % "hibernate-core" % "5.4.9.Final",
  "org.postgresql" % "postgresql" % "42.2.9",
)

PlayKeys.externalizeResources := false

