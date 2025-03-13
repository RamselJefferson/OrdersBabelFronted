#Descripcion Este proyecto esta basado en un crud Basico de Orders. La arquitectura del proyecto esta basada en Clean Architecture, el cual consta de varias capas; Domain, como la capa mas interna que no tiene referencia de ninguna de las otras capas(proyectos)
para desacoplar de manera correta y generar una buena escalabilidad, luego le sigue la capa de Aplicacion que esta consta de los casos de uso la misma tiene acceso a la capa Domain pero no hacia afuera, 
Por otro lado tenemos la capa Infraestructure que contiene mi acceso a datos la misma tiene acceso a los casos de usos(capa de aplicacion) y domain, por otro lado tenemos la capa mas externa que 
es la capa presentation esta es la capa de usuario. Esta arquitectura asegura que cada capa tenga una responsabilidad unica siguiendo asi los principios SOLID.
La aplicacion consta con un middleware para capturar errores globales.

##Manual de ejecucion e Instalacion

Ejecutar el proyecto en el profile de https 
![image](https://github.com/user-attachments/assets/9b170d3b-3b0f-4388-a919-196280b6b054)



##Script de la db

USE [master]
GO
/****** Object:  Database [EvaluacionBabel]    Script Date: 3/13/2025 1:17:49 PM ******/
CREATE DATABASE [EvaluacionBabel]

USE [EvaluacionBabel]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 3/13/2025 1:17:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CustomerName] [varchar](50) NOT NULL,
	[OrderDate] [datetime] NOT NULL,
	[TotalAmount] [decimal](18, 0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [EvaluacionBabel] SET  READ_WRITE 
GO



##Script del trigger de la tabla Orders

USE [EvaluacionBabel]
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_PreventFutureOrderDate]
ON [dbo].[Orders]
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM inserted WHERE OrderDate > GETDATE())
    BEGIN
        ROLLBACK TRANSACTION;
        RETURN;
    END;


    INSERT INTO Orders ( CustomerName, OrderDate, TotalAmount)
    SELECT  CustomerName, OrderDate, TotalAmount
    FROM inserted;
END;
GO

ALTER TABLE [dbo].[Orders] ENABLE TRIGGER [trg_PreventFutureOrderDate]
GO




