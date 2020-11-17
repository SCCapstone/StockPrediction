from nltk.sentiment.vader import SentimentIntensityAnalyzer

# TODO:
#    Find a way to get daily news headlines
#    Find a way to get daily google trends data
#    Use NLTK to get the average sentiment of all headlines
#    Weight the sentiments based off of google trends data

class SentimentAnalysis:
    @staticmethod
    def __get_headlines():
        return []
    @staticmethod
    def __get_trends():
        return 0
    @staticmethod
    def get_sentiment():
        headlines = SentimentAnalysis.__get_headlines()
        trend_weight = SentimentAnalysis.__get_trends()
        sid = SentimentIntensityAnalyzer()
        average_sentiment = 0
        for headline in headlines:
            average_sentiment = average_sentiment + sid.polarity_scores(headline)[0] / len(headlines)
        return trend_weight * average_sentiment
