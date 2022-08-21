---
layout: post
title:  "Reinforcement Learning 2 - An Extended Example : Tic-Tac-Toe"
date: 2022-08-14
tags: Python
ctgry: 개발
excerpt: Tic-Tac-Toe를 통해 강화학습의 일반적인 개념과 다른 접근법들과의 차이를 알아보도록 한다.
---
# 1. 확장 예제 : Tic-Tac-Toe

## 1-1. Tic-Tac-Toe란?
두 명이 번갈아가면서 "O"와 "X"를 3*3 판에 써서 같은 글자를 가로, 세로, 혹은 대각선 상에 놓이도록 하는 놀이다.
삼목이라고 생각할 수 있다. 한 사람이 가로, 세로, 대각선 중 하나의 방향으로 연달아 표시하는 경우 승리하며, 앞 조건에 만족하지 못한 채 칸이 다 채워지면 무승부가된다.





#### - 출처
[1] 책 | Sutton, Richard S., and Andrew G. Barto., 단단한 강화학습 : 강화학습 기본 개념을 제대로 정리한 인공지능 교과서, 제이펍, 2020 <br>
[2] 블로그 | [카카오AI리포트]알파고를 탄생시킨 강화학습의 비밀, https://brunch.co.kr/@kakao-it/73 <br>
[3] 논문 | Sutton, Richard S., and Andrew G. Barto. "Reinforcement learning: An introduction", Cambridge: MIT press, 1998. <br>
