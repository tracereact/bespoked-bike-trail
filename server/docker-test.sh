docker run --name bike-trail-server \
-p 3042:3002 \
bike-trail-server:latest

  #     dockerfile: Dockerfile
  #   # image: public.ecr.aws/x0l0e7m3/bespoked-bike-trail:latest
  #   # image: bespoked-bike-trail:latest
  #   volumes:
  #     - bike-trail-server:/data/bike-trail-server
  #   ports:
  #     - "${BTS_HOST_PORT}:3002"