# GoGetter

### Build
```bash
docker build -t gogetter .
```

### Run
```bash
    docker run -d --name gogetter -p 8080:8080 --link ingester:ingester gogetter
```

