# Watcher

### Steps
1. Build/Run ingester
2. Build/Run gogetter

### Test
```bash
    curl -XPOST -d '{"channel" : "ESPN", "date" : "2017-02-17T14:10:00EST"}' localhost:8080/goget
```
