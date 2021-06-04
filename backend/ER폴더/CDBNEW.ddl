
CREATE TABLE CODE
(
	COMMON_CODE          NUMBER(8) NOT NULL ,
	UPPER_COMMON_CODE    NUMBER(8) NULL ,
	CODE                 NUMBER(8) NULL ,
	CODE_NAME            VARCHAR2(20) NULL 
);



CREATE UNIQUE INDEX XPKCODE ON CODE
(COMMON_CODE   ASC);



ALTER TABLE CODE
	ADD CONSTRAINT  XPKCODE PRIMARY KEY (COMMON_CODE);



CREATE TABLE CS
(
	CS_NUM               NUMBER(8) NOT NULL ,
	CS_NAME              VARCHAR2(16) NOT NULL ,
	BIRTH_DATE           DATE NOT NULL ,
	CONTACT              VARCHAR2(20) NOT NULL ,
	CS_CLASSIFY_CODE     NUMBER(8) NOT NULL 
);



CREATE UNIQUE INDEX XPKCS ON CS
(CS_NUM   ASC);



ALTER TABLE CS
	ADD CONSTRAINT  XPKCS PRIMARY KEY (CS_NUM);



CREATE TABLE DC
(
	DC_NUM               NUMBER(8) NOT NULL ,
	DC_NAME              VARCHAR2(20) NULL ,
	DC_RATE              VARCHAR2(20) NULL 
);



CREATE UNIQUE INDEX XPKDC ON DC
(DC_NUM   ASC);



ALTER TABLE DC
	ADD CONSTRAINT  XPKDC PRIMARY KEY (DC_NUM);



CREATE TABLE DEPT
(
	DEPT_NUM             NUMBER(8) NOT NULL ,
	DEPT_NAME            VARCHAR2(16) NULL 
);



CREATE UNIQUE INDEX XPKDEPT ON DEPT
(DEPT_NUM   ASC);



ALTER TABLE DEPT
	ADD CONSTRAINT  XPKDEPT PRIMARY KEY (DEPT_NUM);



CREATE TABLE EMC_EXIT
(
	ROOM_NUM             NUMBER(8) NOT NULL ,
	EMC_NUM              NUMBER(8) NOT NULL ,
	EMC_LOC_CODE         NUMBER(8) NULL 
);



CREATE UNIQUE INDEX XPKEMC_EXIT ON EMC_EXIT
(EMC_NUM   ASC);



ALTER TABLE EMC_EXIT
	ADD CONSTRAINT  XPKEMC_EXIT PRIMARY KEY (EMC_NUM);



CREATE TABLE EMP
(
	EMP_NUM              NUMBER(8) NOT NULL ,
	DEPT_NUM             NUMBER(8) NOT NULL ,
	EMP_NAME             VARCHAR2(16) NULL ,
	EMP_CONTACT          VARCHAR2(20) NULL ,
	EMP_REG_NUM          VARCHAR2(20) NULL ,
	WORK_START_DATE      DATE NULL ,
	TITLE                VARCHAR2(20) NULL 
);



CREATE UNIQUE INDEX XPKEMP ON EMP
(EMP_NUM   ASC);



ALTER TABLE EMP
	ADD CONSTRAINT  XPKEMP PRIMARY KEY (EMP_NUM);



CREATE TABLE MEM
(
	MEM_NUM              NUMBER(8) NOT NULL ,
	CS_NUM               NUMBER(8) NOT NULL ,
	REG_NUM              VARCHAR2(20) NULL ,
	MEM_ID               VARCHAR2(20) NULL ,
	MEM_PW               VARCHAR2(32) NULL ,
	POINT                NUMBER(10) NULL 
);



CREATE UNIQUE INDEX XPKMEM ON MEM
(MEM_NUM   ASC);



ALTER TABLE MEM
	ADD CONSTRAINT  XPKMEM PRIMARY KEY (MEM_NUM);



CREATE TABLE MOVIE
(
	MOVIE_NUM            NUMBER(8) NOT NULL ,
	MOVIE_NAME           VARCHAR2(32) NOT NULL ,
	SCRN_TIME            NUMBER(8) NOT NULL ,
	MOVIE_RATING_CODE    NUMBER(8) NOT NULL ,
	DIRECTOR             VARCHAR2(20) NOT NULL ,
	CAST                 VARCHAR2(20) NOT NULL ,
	GENRE                VARCHAR2(20) NOT NULL ,
	MOVIE_INTRO          VARCHAR2(128) NULL ,
	SCRN_STATUS          CHAR(4) NOT NULL ,
	COUNTRY              VARCHAR2(20) NULL ,
	RELEASE_DATE         DATE NOT NULL ,
	AVG_STARS            NUMBER(8) NULL 
);



CREATE UNIQUE INDEX XPKMOVIE ON MOVIE
(MOVIE_NUM   ASC);



ALTER TABLE MOVIE
	ADD CONSTRAINT  XPKMOVIE PRIMARY KEY (MOVIE_NUM);



CREATE TABLE PAY_BANKLESS
(
	PAYMENT_NUM          NUMBER(8) NOT NULL ,
	VIRTUAL_ACC_NUM      VARCHAR2(20) NULL ,
	DEPOSIT_PERSON       VARCHAR2(20) NULL 
);



CREATE UNIQUE INDEX XPKPAY_BANKLESS ON PAY_BANKLESS
(PAYMENT_NUM   ASC);



ALTER TABLE PAY_BANKLESS
	ADD CONSTRAINT  XPKPAY_BANKLESS PRIMARY KEY (PAYMENT_NUM);



CREATE TABLE PAY_CARD
(
	PAYMENT_NUM          NUMBER(8) NOT NULL ,
	CARD_NUM             VARCHAR2(20) NULL ,
	CARD_COMPANY         VARCHAR2(20) NULL 
);



CREATE UNIQUE INDEX XPKPAY_CARD ON PAY_CARD
(PAYMENT_NUM   ASC);



ALTER TABLE PAY_CARD
	ADD CONSTRAINT  XPKPAY_CARD PRIMARY KEY (PAYMENT_NUM);



CREATE TABLE PAYMENT
(
	RESERVE_NUM          NUMBER(8) NOT NULL ,
	CS_NUM               NUMBER(8) NOT NULL ,
	PAYMENT_NUM          NUMBER(8) NOT NULL ,
	DC_NUM               NUMBER(8) NULL ,
	DC_PRICE             NUMBER(8) NULL ,
	TOTAL_PRICE          NUMBER(8) NULL ,
	PAYMENT_DATE         DATE NULL ,
	PAYMENT_STATUS       CHAR(4) NULL ,
	APPROVAL_NUM         NUMBER(8) NULL ,
	USED_POINT           NUMBER(8) NULL 
);



CREATE UNIQUE INDEX XPKPAYMENT ON PAYMENT
(PAYMENT_NUM   ASC);



ALTER TABLE PAYMENT
	ADD CONSTRAINT  XPKPAYMENT PRIMARY KEY (PAYMENT_NUM);



CREATE TABLE RESERVE
(
	RESERVE_NUM          NUMBER(8) NOT NULL ,
	PRINT_STATUS         CHAR(4) NOT NULL 
);



CREATE UNIQUE INDEX XPKRESERVE ON RESERVE
(RESERVE_NUM   ASC);



ALTER TABLE RESERVE
	ADD CONSTRAINT  XPKRESERVE PRIMARY KEY (RESERVE_NUM);



CREATE TABLE REVIEW
(
	MOVIE_NUM            NUMBER(8) NOT NULL ,
	REVIEW_NUM           NUMBER(8) NOT NULL ,
	MEM_NUM              NUMBER(8) NOT NULL ,
	STARS                NUMBER(10) NULL ,
	COMMENT              VARCHAR2(128) NULL 
);



CREATE UNIQUE INDEX XPKREVIEW ON REVIEW
(REVIEW_NUM   ASC);



ALTER TABLE REVIEW
	ADD CONSTRAINT  XPKREVIEW PRIMARY KEY (REVIEW_NUM);



CREATE TABLE SCHEDULE
(
	MOVIE_NUM            NUMBER(8) NOT NULL ,
	SCHEDULE_NUM         NUMBER(8) NOT NULL ,
	ROOM_NUM             NUMBER(8) NOT NULL ,
	SCRN_DATE            DATE NOT NULL ,
	START_TIME           NUMBER(8) NOT NULL ,
	RESIDUAL_SEAT        NUMBER(8) NOT NULL 
);



CREATE UNIQUE INDEX XPKSCHEDULE ON SCHEDULE
(SCHEDULE_NUM   ASC);



ALTER TABLE SCHEDULE
	ADD CONSTRAINT  XPKSCHEDULE PRIMARY KEY (SCHEDULE_NUM);



CREATE TABLE SCRN_ROOM
(
	ROOM_NUM             NUMBER(8) NOT NULL ,
	ROOM_NAME            VARCHAR2(16) NULL ,
	TOTAL_SEAT_CAP       NUMBER(10) NULL ,
	ROW_NUM              NUMBER(10) NULL ,
	COL_NUM              NUMBER(10) NULL 
);



CREATE UNIQUE INDEX XPKSCRN_ROOM ON SCRN_ROOM
(ROOM_NUM   ASC);



ALTER TABLE SCRN_ROOM
	ADD CONSTRAINT  XPKSCRN_ROOM PRIMARY KEY (ROOM_NUM);



CREATE TABLE SEAT
(
	SEAT_NUM             NUMBER(8) NOT NULL ,
	SEAT_RATING_CODE     NUMBER(8) NOT NULL ,
	ROOM_NUM             NUMBER(8) NOT NULL 
);



CREATE UNIQUE INDEX XPKSEAT ON SEAT
(SEAT_NUM   ASC);



ALTER TABLE SEAT
	ADD CONSTRAINT  XPKSEAT PRIMARY KEY (SEAT_NUM);



CREATE TABLE SEAT_RATING
(
	SEAT_RATING_CODE     NUMBER(8) NOT NULL ,
	SEAT_RATING_NAME     VARCHAR2(20) NULL ,
	SEAT_PRICE           NUMBER(8) NULL 
);



CREATE UNIQUE INDEX XPKSEAT_RATING ON SEAT_RATING
(SEAT_RATING_CODE   ASC);



ALTER TABLE SEAT_RATING
	ADD CONSTRAINT  XPKSEAT_RATING PRIMARY KEY (SEAT_RATING_CODE);



CREATE TABLE TICKET
(
	SCHEDULE_NUM         NUMBER(8) NOT NULL ,
	SEAT_NUM             NUMBER(8) NOT NULL ,
	TICKET_NUM           NUMBER(8) NOT NULL ,
	RESERVE_NUM          NUMBER(8) NOT NULL ,
	ROOM_NUM             NUMBER(8) NULL ,
	SEAT_PRICE           NUMBER(8) NULL ,
	SCRN_TIME            NUMBER(8) NULL 
);



CREATE UNIQUE INDEX XPKTICKET ON TICKET
(TICKET_NUM   ASC);



ALTER TABLE TICKET
	ADD CONSTRAINT  XPKTICKET PRIMARY KEY (TICKET_NUM);



CREATE TABLE TRAILER_SHOT
(
	MOVIE_NUM            NUMBER(8) NOT NULL ,
	TRAILER_SHOT_NUM     NUMBER(8) NOT NULL ,
	TRAILER_SHOT_ROUTE   VARCHAR2(20) NULL 
);



CREATE UNIQUE INDEX XPKTRAILER_SHOT ON TRAILER_SHOT
(TRAILER_SHOT_NUM   ASC);



ALTER TABLE TRAILER_SHOT
	ADD CONSTRAINT  XPKTRAILER_SHOT PRIMARY KEY (TRAILER_SHOT_NUM);



CREATE TABLE TRAILER_VIDEO
(
	MOVIE_NUM            NUMBER(8) NOT NULL ,
	TRAILER_VIDEO_NUM    NUMBER(8) NOT NULL ,
	TRAILER_VIDEO_ROUTE  VARCHAR2(20) NULL 
);



CREATE UNIQUE INDEX XPKTRAILER_VIDEO ON TRAILER_VIDEO
(TRAILER_VIDEO_NUM   ASC);



ALTER TABLE TRAILER_VIDEO
	ADD CONSTRAINT  XPKTRAILER_VIDEO PRIMARY KEY (TRAILER_VIDEO_NUM);



CREATE TABLE VISIT_STATUS
(
	ROOM_NUM             NUMBER(8) NOT NULL ,
	VISIT_NUM            NUMBER(8) NOT NULL ,
	VISIT_NAME           VARCHAR2(16) NULL ,
	VISIT_CONTACT        VARCHAR2(20) NULL ,
	VISIT_TIME           NUMBER(8) NULL 
);



CREATE UNIQUE INDEX XPKVISIT_STATUS ON VISIT_STATUS
(VISIT_NUM   ASC);



ALTER TABLE VISIT_STATUS
	ADD CONSTRAINT  XPKVISIT_STATUS PRIMARY KEY (VISIT_NUM);



ALTER TABLE EMC_EXIT
	ADD (CONSTRAINT R_3 FOREIGN KEY (ROOM_NUM) REFERENCES SCRN_ROOM (ROOM_NUM));



ALTER TABLE EMP
	ADD (CONSTRAINT R_14 FOREIGN KEY (DEPT_NUM) REFERENCES DEPT (DEPT_NUM));



ALTER TABLE MEM
	ADD (CONSTRAINT R_15 FOREIGN KEY (CS_NUM) REFERENCES CS (CS_NUM));



ALTER TABLE PAY_BANKLESS
	ADD (CONSTRAINT R_16 FOREIGN KEY (PAYMENT_NUM) REFERENCES PAYMENT (PAYMENT_NUM));



ALTER TABLE PAY_CARD
	ADD (CONSTRAINT R_17 FOREIGN KEY (PAYMENT_NUM) REFERENCES PAYMENT (PAYMENT_NUM));



ALTER TABLE PAYMENT
	ADD (CONSTRAINT R_10 FOREIGN KEY (RESERVE_NUM) REFERENCES RESERVE (RESERVE_NUM));



ALTER TABLE PAYMENT
	ADD (CONSTRAINT R_11 FOREIGN KEY (CS_NUM) REFERENCES CS (CS_NUM));



ALTER TABLE PAYMENT
	ADD (CONSTRAINT R_12 FOREIGN KEY (DC_NUM) REFERENCES DC (DC_NUM) ON DELETE SET NULL);



ALTER TABLE REVIEW
	ADD (CONSTRAINT R_5 FOREIGN KEY (MOVIE_NUM) REFERENCES MOVIE (MOVIE_NUM));



ALTER TABLE REVIEW
	ADD (CONSTRAINT R_21 FOREIGN KEY (MEM_NUM) REFERENCES MEM (MEM_NUM));



ALTER TABLE SCHEDULE
	ADD (CONSTRAINT R_4 FOREIGN KEY (MOVIE_NUM) REFERENCES MOVIE (MOVIE_NUM));



ALTER TABLE SCHEDULE
	ADD (CONSTRAINT R_1 FOREIGN KEY (ROOM_NUM) REFERENCES SCRN_ROOM (ROOM_NUM));



ALTER TABLE SEAT
	ADD (CONSTRAINT R_20 FOREIGN KEY (SEAT_RATING_CODE) REFERENCES SEAT_RATING (SEAT_RATING_CODE));



ALTER TABLE SEAT
	ADD (CONSTRAINT R_2 FOREIGN KEY (ROOM_NUM) REFERENCES SCRN_ROOM (ROOM_NUM));



ALTER TABLE TICKET
	ADD (CONSTRAINT R_7 FOREIGN KEY (SCHEDULE_NUM) REFERENCES SCHEDULE (SCHEDULE_NUM));



ALTER TABLE TICKET
	ADD (CONSTRAINT R_6 FOREIGN KEY (SEAT_NUM) REFERENCES SEAT (SEAT_NUM));



ALTER TABLE TICKET
	ADD (CONSTRAINT R_8 FOREIGN KEY (RESERVE_NUM) REFERENCES RESERVE (RESERVE_NUM));



ALTER TABLE TRAILER_SHOT
	ADD (CONSTRAINT R_18 FOREIGN KEY (MOVIE_NUM) REFERENCES MOVIE (MOVIE_NUM));



ALTER TABLE TRAILER_VIDEO
	ADD (CONSTRAINT R_19 FOREIGN KEY (MOVIE_NUM) REFERENCES MOVIE (MOVIE_NUM));



ALTER TABLE VISIT_STATUS
	ADD (CONSTRAINT R_13 FOREIGN KEY (ROOM_NUM) REFERENCES SCRN_ROOM (ROOM_NUM));


