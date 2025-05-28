"use client";

import React from "react";
import { services } from ",,/../assets/data";

const Services = () => {
  return (
    <View>
      <Text style={[styles.h2, { paddingBottom: 10 }]}>
        Our Commercial Cleaning Services Include But Are Not Limited To:
      </Text>

      {services.map((service, index) => (
        <View style={styles.serviceRow} key={index}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.serviceText}>{service}</Text>
        </View>
      ))}
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  h2: {
    fontSize: 24,
    fontWeight: "700",
    color: "#38434D",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    fontWeight: "700",
    fontSize: 18.72,
    lineHeight: 24,
    marginRight: 5,
  },
  serviceText: {
    fontSize: 18.72,
    lineHeight: 24,
    flexShrink: 1,
  },
});
