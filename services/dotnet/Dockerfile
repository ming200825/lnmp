FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base

WORKDIR /app


FROM microsoft/dotnet:2.2-sdk AS build

WORKDIR /src

COPY sampleapp.csproj ./

RUN dotnet restore sampleapp.csproj

COPY . .


RUN dotnet build sampleapp.csproj -c Release -o /app

 

FROM build AS publish

RUN dotnet publish sampleapp.csproj -c Release -o /app

 

FROM base AS final

WORKDIR /app

COPY --from=publish /app .

ENTRYPOINT ["dotnet", "sampleapp.dll"]