---
layout: post
title:  "Tic-Tac-Toe with AI"
date: 2022-08-14
tags: Python
ctgry: 개발
excerpt: Minimax Algorithm을 활용한 Tic-Tac-Toe
---
# 1. Tic-Tac-Toe with AI

## 1-1. Tic-Tac-Toe란?
두 명이 번갈아가면서 "O"와 "X"를 3*3 판에 써서 같은 글자를 가로, 세로, 혹은 대각선 상에 놓이도록 하는 놀이다.
삼목이라고 생각할 수 있다. 한 사람이 가로, 세로, 대각선 중 하나의 방향으로 연달아 표시하는 경우 승리하며, 앞 조건에 만족하지 못한 채 칸이 다 채워지면 무승부가 된다.

## 1-2. 최소최대 탐색 알고리즘(Minimax Algorithm)
* 최소최대 알고리즘 : 기대되는 최대의 손실을 최소화하기 위해 사용하는 이론 중 하나.
  * 최소최대 원리에 따라 실패했을 떄 어떻게 될지에 초점을 두어 그 손실이 최소가 되도록 세우는 전략(성공에 의한 효과는 생각 X)
  * 제로섬 게임 이론으로부터 시작하였으나, 더 복잡하고 불확실성이 존재하는 일반적인 의사결정을 포함하여 널리 쓰이고 있음.
  * 특정 게임 상태에서 승리를 위해서는 가장 승률이 높은 수를 선택해야 함. 승률이 높은 수는 본인에게 유리한 수이고, 상대에게는 불리한 수이다
  -> 따라서 상대의 이익을 최소화(Minimize)하고 자신의 이익을 최대화(Maximize)하는 것이 게임에서 승리하는 방법으로 이 경로를 찾는 것이 인공지능 게임 프로그램의 핵심

* 최소최대 알고리즘의 트리 탐색 과정은 깊이 우선 탐색 진행 후, 서브 트리 탐색이 끝나면 기존 탐색 노드들을 역으로 거슬러 올라가며 상위노드로 평갓값을 반영함.
  * 이때 최댓값과 최솟값은 교대로 비교하며 최종 서브 트리를 선택함.
* 평갓값이 자식 노드에서 상위 노드로 전파될 때마다 해당 상위 노드의 자식 노드 간의 비교를 진행하고, 나의 수에서는 MAX 값을, 상대 수에서는 MIN 값을 선택한다.

<center> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Minimax.svg/600px-Minimax.svg.png"><br> <a href="https://en.wikipedia.org/wiki/Minimax#Combinatorial_game_theory"> [ A Minimax Tree Example ]</a></center>

### - Minimax algorithm with alternate moves
Minimax 알고리즘은 n-player 게임에서 다음 수를 고르기 위한 재귀 알고리즘이다.(대개 2인용 게임) 가치(Value)는 게임의 상태(state) 또는 각 위치와 연관되어 있고, 이 가치는 위치 평가 함수의 평균(means of a position evaluation function)에 의해 계산된다.
그리고 이는 플레이어가 그 위치에 두는 것이 얼마나 좋은 지를 나타낸다. 플레이어는 상대방이 둘 수 있는 수에서 비롯된 위치의 최솟값을 최대화하는 수를 둔다.
만약 A의 차례가 된다면, A는 둘수 있는 수들 각각에 대하여 가치를 정의한다. <br><br>
가능한 할당 메소드는 A에 대하여 +1, B는 -1로 특정 승리를 할당하거나, 만약 수 이동의 결과가 A의 즉각적인 승리일 경우 양의 무한대를, 반대의 경우 음의 무한대를 부여하는 규칙을 사용하는 것이다.
다른 모든 수에 대한 A의 가치는 B의 가능한 응답(수)에서 비롯된 최댓값이므로, A는 "maximizing player", B는 "minimizing player"라고 해서 Minimax Algorithm이라는 이름이 붙었다. 
이 방법은 일반적으로 체스나 바둑과 같이 복잡한 게임의 결과까지 탐색해야 가능하다. 그 이유는 게임이 끝나기 전에 수를 예측하는 것은 계산적으로 가능하지 않기 때문이다.




#### - 출처
