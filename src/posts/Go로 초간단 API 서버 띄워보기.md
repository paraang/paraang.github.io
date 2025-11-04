---
title: Go로 초간단 API 서버 띄워보기
id: BG-7
description: Golang과 함께 echo, postgres, gorm을 이용하여 간단한 REST API 서버 만들어보기입니다.
date: '2023-10-11 23:24:00'
categories:
  - Go
published: true
---

# go init

```sh
$ go mod init <module-path>
```

# echo

`echo`는 `Go` 언어의 웹 프레임워크입니다.

> High performance, extensible, minimalist Go web framework

REST API 서버를 만들기 위한 프레임워크에는 `Gin`, `Echo`, `Fiber` 등이 있는데 성능에서는 Fiber가 가장 우수한것으로 보입니다. 하지만 문서화가 가장 잘 되어있어 학습에 용이한 것은 `Echo`인 것으로 보입니다.

비교적 배우기 쉽다고 하는 Echo를 이용해보았습니다.

아래 깃헙을 참고하여 `echo`를 설치하겠습니다.

> https://github.com/labstack/echo

```sh
$ go get github.com/labstack/echo/v4
```

아래와 같이 패키지들이 설치될 것인데, 설치 환경에 따라 에러 메시지와 함께 추가적인 설치를 요구할 수도 있습니다.

제가 그러했는데, 에러 메시지가 안내하는데로 설치를 하면 해결됩니다.

```go
require (
	github.com/golang-jwt/jwt v3.2.2+incompatible // indirect
	github.com/labstack/echo/v4 v4.11.2 // indirect
	github.com/labstack/gommon v0.4.0 // indirect
	github.com/mattn/go-colorable v0.1.13 // indirect
	github.com/mattn/go-isatty v0.0.19 // indirect
	github.com/valyala/bytebufferpool v1.0.0 // indirect
	github.com/valyala/fasttemplate v1.2.2 // indirect
	golang.org/x/crypto v0.14.0 // indirect
	golang.org/x/net v0.17.0 // indirect
	golang.org/x/sys v0.13.0 // indirect
	golang.org/x/text v0.13.0 // indirect
	golang.org/x/time v0.3.0 // indirect
)
```

깃헙에서 제공하는 샘플 코드로 서버가 제대로 띄워지는지도 확인해보겠습니다.

```go
// main.go
package main

import (
  "github.com/labstack/echo/v4"
  "github.com/labstack/echo/v4/middleware"
  "net/http"
)

func main() {
  // Echo instance
  e := echo.New()

  // Middleware
  e.Use(middleware.Logger())
  e.Use(middleware.Recover())

  // Routes
  e.GET("/", hello)

  // Start server
  e.Logger.Fatal(e.Start(":1323"))
}

// Handler
func hello(c echo.Context) error {
  return c.String(http.StatusOK, "Hello, World!")
}
```

문서에서 제공하는 샘플 코드를 그대로 복사하여 프로그램을 실행시키고

```sh
$ go run main.go
```

`localhost:1323`으로 이동해보면 `Hello, World!`가 잘 나오는 것을 볼 수 있습니다.

![Hello world](/images/post/BG-7/1.png)

# DB 준비

DB는 로컬에 설치된 Postgres를 이용하였고 아래의 쿼리를 이용하여 간단한 테이블과 데이터도 미리 만들어 놓습니다.

```sql
CREATE TABLE students
(
    id bigint NOT NULL,
    name text COLLATE pg_catalog."default",
    CONSTRAINT students_pkey PRIMARY KEY (id)
);

INSERT INTO students(id, name) VALUES
    (1, 'A'),
    (2, 'B'),
    (3, 'C');
```

# GORM

`GORM`은 `Go`에서 가장 많이 쓰이는 ORM입니다.
쓸만한 ORM이 어떤 것들이 있나 파악하기 위해 아래와 같은 글들을 읽어보았지만 저같은 쫄보는 역시 많이 쓰이고 많은 레퍼런스가 있는 것이 가장 좋지 않나 싶습니다.

- https://seongmin.dev/develop-backend-with-golang-2-choose-orm
- https://blog.billo.io/devposts/go_orm_recommandation/

`GORM`을 적용하는 과정도 공식 문서를 거의 그대로 따라하였으니 참고하세요.

> https://gorm.io/index.html

```sh
$ go get -u gorm.io/gorm
```

## 모델

앞선 DB 파트에서 생성한 `students` 테이블에 맞게 모델을 작성합니다.

```go
// model/student.go
package model

type Student struct {
	Id   string `jsong:"id"`
	Name string `jsong:"name"`
}
```

## DB 커넥션 정보 정의

DB 커넥션 정보를 담은 설정 파일도 생성해 줍니다.

```go
// config/db.db
package config

import "fmt"

const (
	DB_USER     = "your db user name"
	DB_PASSWORD = "your db password"
	DB_NAME     = "your db name"
	DB_HOST     = "localhost"
	DB_PORT     = "5432"
	DB_TYPE     = "postgres"
)

func GetDBType() string {
	return DB_TYPE
}

func GetPostgresConnectionString() string {
	dataBase := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
		DB_HOST,
		DB_PORT,
		DB_USER,
		DB_NAME,
		DB_PASSWORD,
	)

	return dataBase
}
```

## DB 커넥션

DB 커넥션을 위한 함수를 만들어주고, `main.go`에서 `echo`에서 복사해온 코드에 DB 커넥션 부분을 추가해줍니다.

```go
// storage/db.go
package storage

import (
	"log"
	config "go-api-server/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func NewDB(params... string) *gorm.DB {
	var err error

	var connectionString string = config.GetPostgresConnectionString()

	DB, err = gorm.Open(postgres.Open(connectionString), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	return DB
}

func GetDB() *gorm.DB {
	return DB
}
```

```go
func main() {
  // Echo instance
  e := echo.New()

  storage.NewDB()

  // Middleware
  e.Use(middleware.Logger())
  e.Use(middleware.Recover())

  // ...
}
```

## 테스트용 엔드포인트 생성

`GORM`이 DB에서 정상적으로 연결되는지를 확인해보기 위해 테스트용 엔드포인트를 생성해줍니다.

MVC 패턴을 이용하여 컨트롤러와 서비스로 나눠주었습니다.

```go
// controller/student.go
package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"go-api-server/model"
	"go-api-server/storage"
)

func GetStudents(c echo.Context) error {
	students, _ := GetRepoStudents()
	return c.JSON(http.StatusOK, students)
}

func GetRepoStudents() ([]model.Student, error) {
	db := storage.GetDB()
	students := []model.Student{}

	if err := db.Find(&students).Error; err != nil {
		return nil, err
	}
	return students, nil
}
```

```go
// service/student.go
package service

import (
	"go-api-server/model"
	"go-api-server/storage"
)

func Students() ([]model.Student, error) {
	db := storage.GetDB()
	students := []model.Student{}

	if err := db.Find(&students).Error; err != nil {
		return nil, err
	}
	return students, nil
}
```

```go
func main() {
  // ...

  // Routes
  e.GET("/", hello)
  e.GET("/students", controller.GetStudents)

  // ...
}
```

이제 DB 커넥션이 제대로 이루어지는지 서버를 실행시키고 엔드포인트로 접속해봅니다.

```sh
$ go run main.go
```

![Alt text](/images/post/BG-7/2.png)

커넥션이 정상적으로 이루어졌다면 위 사진과 같이 데이터가 반환됩니다.
